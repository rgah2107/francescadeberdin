import { activeSocialLinks, type SocialId } from "@/lib/contact";

export function SocialLinks({
  title,
  labels,
  className,
  linkClassName,
}: {
  title: string;
  labels: Record<SocialId, string>;
  className?: string;
  linkClassName: string;
}) {
  const links = activeSocialLinks();
  if (links.length === 0) return null;

  return (
    <nav className={className} aria-label={title}>
      <p className="font-interface text-lg font-semibold">{title}</p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3 font-interface text-lg">
        {links.map((link) => (
          <li key={link.id}>
            <a
              className={linkClassName}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {labels[link.id]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
