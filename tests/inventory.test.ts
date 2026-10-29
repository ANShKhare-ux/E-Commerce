import { describe, it, expect, beforeEach } from "vitest";
import { db } from "@/lib/db";

describe("LUMIÈRE Automatic Inventory Engine", () => {
  beforeEach(() => {
    db.reset();
  });

  it("should successfully reserve stock when sufficient available stock exists", async () => {
    const variant = await db.products.getVariantBySku("LUM-ETH-GUL-S-ROSE");
    expect(variant).toBeDefined();

    const initialInv = await db.inventory.getByVariantId(variant!.id);
    expect(initialInv).toBeDefined();
    const initialAvailable = initialInv!.available_stock;

    // Reserve 2 units
    const res = await db.inventory.reserveStock("session_test_1", variant!.id, 2, 15);
    expect(res.success).toBe(true);
    expect(res.reservationId).toBeDefined();

    // Verify inventory state
    const updatedInv = await db.inventory.getByVariantId(variant!.id);
    expect(updatedInv!.reserved_stock).toBe(initialInv!.reserved_stock + 2);
    expect(updatedInv!.available_stock).toBe(initialAvailable - 2);

    // Verify movement log
    const movements = await db.inventory.getMovements(variant!.id);
    const holdMove = movements.find((m) => m.movement_type === "reservation_hold");
    expect(holdMove).toBeDefined();
    expect(holdMove?.reference_id).toBe(res.reservationId);
  });

  it("should reject reservations exceeding available stock to prevent overselling", async () => {
    const variant = await db.products.getVariantBySku("LUM-LUX-CAP-M-GLD"); // Only 2 in stock!
    expect(variant).toBeDefined();

    const inv = await db.inventory.getByVariantId(variant!.id);
    expect(inv!.available_stock).toBe(2);

    // Attempt to reserve 5 units
    const res = await db.inventory.reserveStock("session_test_oversell", variant!.id, 5, 15);
    expect(res.success).toBe(false);
    expect(res.error).toContain("Insufficient available stock");

    // Verify stock was not modified
    const checkInv = await db.inventory.getByVariantId(variant!.id);
    expect(checkInv!.reserved_stock).toBe(0);
    expect(checkInv!.available_stock).toBe(2);
  });

  it("should clean up expired reservations and restore available stock", async () => {
    const variant = await db.products.getVariantBySku("LUM-MEN-POL-S-SND");
    expect(variant).toBeDefined();

    const initialInv = await db.inventory.getByVariantId(variant!.id);
    const initialAvailable = initialInv!.available_stock;

    // Reserve stock with -1 minute duration (already expired)
    const res = await db.inventory.reserveStock("session_expired_test", variant!.id, 3, -1);
    expect(res.success).toBe(true);

    const holdingInv = await db.inventory.getByVariantId(variant!.id);
    expect(holdingInv!.available_stock).toBe(initialAvailable - 3);

    // Run cron cleanup
    const cleanedCount = await db.inventory.cleanupExpired();
    expect(cleanedCount).toBeGreaterThanOrEqual(1);

    // Verify stock is restored
    const restoredInv = await db.inventory.getByVariantId(variant!.id);
    expect(restoredInv!.reserved_stock).toBe(initialInv!.reserved_stock);
    expect(restoredInv!.available_stock).toBe(initialAvailable);
  });

  it("should enforce adjustment reason when modifying stock manually", async () => {
    const variant = await db.products.getVariantBySku("LUM-STR-HD1-S-BLK");
    expect(variant).toBeDefined();

    // Rejects empty reason
    const failedAdjust = await db.inventory.adjustStock(variant!.id, 50, "", "admin@lumiere.in");
    expect(failedAdjust.success).toBe(false);
    expect(failedAdjust.error).toContain("reason is strictly required");

    // Rejects negative quantity
    const negativeAdjust = await db.inventory.adjustStock(variant!.id, -5, "Damaged write-off", "admin@lumiere.in");
    expect(negativeAdjust.success).toBe(false);
    expect(negativeAdjust.error).toContain("cannot be negative");

    // Valid adjustment
    const validAdjust = await db.inventory.adjustStock(
      variant!.id,
      35,
      "Stock intake from Ludhiana knitting mill",
      "admin@lumiere.in"
    );
    expect(validAdjust.success).toBe(true);

    const updated = await db.inventory.getByVariantId(variant!.id);
    expect(updated!.physical_stock).toBe(35);
  });

  it("should identify low stock SKUs below configured threshold", async () => {
    const lowStock = await db.inventory.getLowStock();
    expect(lowStock.length).toBeGreaterThan(0);

    for (const item of lowStock) {
      expect(item.available_stock).toBeLessThanOrEqual(item.low_stock_threshold);
    }
  });
});
