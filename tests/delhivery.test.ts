import { describe, it, expect } from "vitest";
import { DelhiveryService } from "@/lib/services/delhivery";

describe("LUMIÈRE Official Delhivery Logistics Service", () => {
  it("should validate and approve serviceable Indian PIN codes", async () => {
    // Metro pincodes
    const mumbaiCheck = await DelhiveryService.checkServiceability("400001");
    expect(mumbaiCheck.serviceable).toBe(true);
    expect(mumbaiCheck.city).toBe("Mumbai");
    expect(mumbaiCheck.cod_available).toBe(true);
    expect(mumbaiCheck.estimated_delivery_days).toBeLessThanOrEqual(3);

    const delhiCheck = await DelhiveryService.checkServiceability("110001");
    expect(delhiCheck.serviceable).toBe(true);
    expect(delhiCheck.city).toContain("Delhi");

    const bengaluruCheck = await DelhiveryService.checkServiceability("560001");
    expect(bengaluruCheck.serviceable).toBe(true);
  });

  it("should strictly reject invalid Indian PIN code formats", async () => {
    // Less than 6 digits
    const shortCheck = await DelhiveryService.checkServiceability("40001");
    expect(shortCheck.serviceable).toBe(false);
    expect(shortCheck.error).toContain("Must be 6 digits");

    // Starting with 0
    const zeroStart = await DelhiveryService.checkServiceability("012345");
    expect(zeroStart.serviceable).toBe(false);
    expect(zeroStart.error).toContain("cannot start with 0");

    // Non-numeric
    const nonNumeric = await DelhiveryService.checkServiceability("4000AA");
    expect(nonNumeric.serviceable).toBe(false);
  });

  it("should return detailed tracking information for waybill", async () => {
    const tracking = await DelhiveryService.trackShipment("DEL-984719283741");
    expect(tracking).toBeDefined();
    expect(tracking?.status).toBe("In Transit");
    expect(tracking?.scans.length).toBeGreaterThan(0);
  });
});
