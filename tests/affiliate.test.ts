import { describe, it, expect, beforeEach } from "vitest";
import { db } from "@/lib/db";

describe("LUMIÈRE Affiliate Integration & Review Pipeline", () => {
  beforeEach(() => {
    db.reset();
  });

  it("should maintain pending review status until admin explicit approval", async () => {
    const queue = await db.affiliate.getQueue();
    const pendingItem = queue.find((i) => i.review_status === "pending");
    expect(pendingItem).toBeDefined();
    expect(pendingItem?.is_published).toBe(false);

    // Approve item
    const approveRes = await db.affiliate.updateReview(pendingItem!.id, "approved", true, "admin@lumiere.in");
    expect(approveRes.success).toBe(true);

    const updatedQueue = await db.affiliate.getQueue();
    const approvedItem = updatedQueue.find((i) => i.id === pendingItem!.id);
    expect(approvedItem?.review_status).toBe("approved");
    expect(approvedItem?.is_published).toBe(true);
  });

  it("should detect out-of-stock affiliate listings during synchronization", async () => {
    const syncRes = await db.affiliate.syncSources();
    expect(syncRes.itemsChecked).toBeGreaterThan(0);
    expect(syncRes.staleCount).toBeGreaterThanOrEqual(1);

    // Verify scheduled job record was logged
    const jobs = await db.audit.getJobs();
    const syncJob = jobs.find((j) => j.job_name === "AFFILIATE_FEED_SYNC");
    expect(syncJob).toBeDefined();
    expect(syncJob?.status).toBe("success");
  });
});
