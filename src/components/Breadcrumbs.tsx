import Link from "next/link";
import { SITE_URL } from "@/lib/data";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center gap-1.5 min-w-0">
                {idx > 0 && <span className="text-slate-300">/</span>}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="font-medium text-slate-600 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="font-semibold text-slate-800 truncate max-w-[260px] sm:max-w-[440px]"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
