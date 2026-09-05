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
    <nav className="flex gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 print:hidden">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive
                ? 'font-semibold text-slate-900 border-b-2 border-slate-900 pb-1'
                : 'text-slate-500 hover:text-slate-800 pb-1'
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
