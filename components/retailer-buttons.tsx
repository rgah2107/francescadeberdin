import { purchaseLinks } from "@/lib/purchase";
import type { Dictionary } from "@/content/types";

export function RetailerButtons({
  retailers,
}: {
  retailers: Dictionary["retailers"];
}) {
  const available = retailers.filter((retailer) => purchaseLinks[retailer.id].trim());

  return (
    <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {available.map((retailer) => (
        <li key={retailer.id}>
          <a
            className="btn btn-primary w-full sm:w-auto"
            href={purchaseLinks[retailer.id].trim()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {retailer.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
