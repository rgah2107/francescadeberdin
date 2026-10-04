export const retailerIds = ["ridero", "amazon", "other"] as const;

export type RetailerId = (typeof retailerIds)[number];

/**
 * Shop links for Moscow Diary.
 * Only retailers with a URL are shown.
 * English uses Amazon. Russian uses Ridero.
 */
export const purchaseLinks: Record<RetailerId, string> = {
  ridero: "https://ridero.ru/books/moskovskii_dnevnik/",
  amazon: "https://www.amazon.com/dp/B0DHV2Y9X4",
  other: "",
};

export function activePurchaseLinks(): string[] {
  return retailerIds
    .map((id) => purchaseLinks[id].trim())
    .filter((href) => href.length > 0);
}
