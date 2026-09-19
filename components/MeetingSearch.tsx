'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type="text"
      aria-label="Search meetings by speaker, presiding, conducting, or meeting type"
      placeholder="Search by speaker, presiding, conducting, or type..."
      defaultValue={searchParams.get('query')?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full border border-[var(--color-line)] px-4 py-2 text-sm bg-white focus:outline-none focus:border-[var(--color-gold)]"
    />
  );
}
