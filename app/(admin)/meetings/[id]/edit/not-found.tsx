import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="font-display text-2xl text-[var(--color-ink)] mb-3">
        Meeting Not Found
      </h1>
      <p className="text-[var(--color-muted)] mb-6">
        We couldn&apos;t find a meeting with that ID.
      </p>
      <Link href="/meetings" className="text-[#1e3a5f] underline">
        Back to Meetings
      </Link>
    </div>
  );
}
