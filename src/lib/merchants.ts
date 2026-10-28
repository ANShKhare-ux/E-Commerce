import { MERCHANTS } from '@/data/merchants';
import { Merchant } from '@/types/merchant';

export async function getMerchantById(id: string): Promise<Merchant | null> {
  const merchant = MERCHANTS[id.toLowerCase()];
  return merchant || null;
}

export async function getAllMerchants(): Promise<Merchant[]> {
  return Object.values(MERCHANTS);
}
