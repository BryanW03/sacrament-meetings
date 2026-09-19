'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/meetings', label: 'All Meetings' },
  { href: '/meetings/current', label: 'Current Meeting' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[var(--color-line)] print:hidden">
      <div className="max-w-3xl mx-auto flex gap-8 px-6">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive
                  ? 'py-3 border-b-2 border-[#9c7a3c] text-[var(--color-ink)] font-medium'
                  : 'py-3 border-b-2 border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]'
              }
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
