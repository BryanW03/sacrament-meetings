'use client';

import { useEffect } from 'react';

export default function AdminMeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center py-16">
      <h1 className="font-display text-2xl text-[var(--color-ink)] mb-3">
        Something Went Wrong
      </h1>
      <p className="text-[var(--color-muted)] mb-6">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-5 py-2 border border-[#1e3a5f] text-[#1e3a5f] text-sm hover:bg-[#1e3a5f] hover:text-white"
        >
          Try Again
        </button>
        <a
          href="/meetings"
          className="px-5 py-2 text-sm text-[#1e3a5f] underline self-center"
        >
          Back to Meetings
        </a>
      </div>
    </div>
  );
}
