import { en } from "@/content/en";
import { ru } from "@/content/ru";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/routes";

const dictionaries: Record<Locale, Dictionary> = { en, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
