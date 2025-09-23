'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumbsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Generate breadcrumbs based on the current path
  const breadcrumbs = pathname
    .split("/")
    .filter((segment) => segment) // Remove empty segments
    .map((segment, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");
      const isLast = index === array.length - 1;

      return (
        <li key={href} className="inline">
          {!isLast ? (
            <Link href={href} className="text-blue-500 hover:underline">
              {decodeURIComponent(segment)}
            </Link>
          ) : (
            <span className="text-gray-500">{decodeURIComponent(segment)}</span>
          )}
          {!isLast && <span className="mx-2">/</span>}
        </li>
      );
    });

  return (
    <div className="p-4">
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumbs" className="mb-4">
        <ul className="flex flex-wrap text-sm">{breadcrumbs}</ul>
      </nav>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}