export const featuredVideo = {
  id: "Rt6dz7l0xy0",
  embedUrl: "https://www.youtube.com/embed/Rt6dz7l0xy0",
  watchUrl: "https://www.youtube.com/watch?v=Rt6dz7l0xy0",
} as const;

export const socialIds = ["youtube", "facebook", "instagram", "tiktok"] as const;

export type SocialId = (typeof socialIds)[number];

/**
 * Public pages for Francesca de Bardin.
 * Paste a full https URL for each one. Leave "" until the page exists.
 * Empty entries are not shown.
 */
export const socialLinks: Record<SocialId, string> = {
  youtube: "https://www.youtube.com/@francescaDeBardinofficial",
  facebook: "https://www.facebook.com/FrancescadeBardinAuthor",
  instagram: "https://www.instagram.com/francescadebardin/",
  tiktok: "https://www.tiktok.com/@francesca.de.bard",
};

/** Inbox for the contact form. Swap CONTACT_TO when Francesca's address is ready. */
export const contactInbox = process.env.CONTACT_TO?.trim() || "rgah2107@gmail.com";

export function activeSocialLinks(): { id: SocialId; href: string }[] {
  return socialIds.flatMap((id) => {
    const href = socialLinks[id].trim();
    return href ? [{ id, href }] : [];
  });
}
