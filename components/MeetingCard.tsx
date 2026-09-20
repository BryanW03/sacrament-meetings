import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';
import { deleteMeeting } from '@/lib/actions';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

const typeLabels: Record<SacramentMeeting['meetingType'], string> = {
  testimony: 'Testimony Meeting',
  regular: 'Regular Meeting',
  stake: 'Stake Meeting',
  general: 'General Conference',
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div className="flex items-stretch gap-4 border border-[var(--color-line)] bg-white hover:border-[#9c7a3c] transition-colors">
      <span className="w-1.5 bg-[#1e3a5f]" />
      <Link href={`/meetings/${meeting.id}`} className="py-4 flex-1">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-lg text-[var(--color-ink)]">
            {meeting.date}
          </span>
          <span className="text-xs text-[var(--color-muted)]">
            {typeLabels[meeting.meetingType]}
          </span>
        </div>
        <p className="text-sm text-[var(--color-muted)] mt-1">
          Presiding: {meeting.presiding}
        </p>
        <p className="text-sm text-[var(--color-muted)]">
          Speakers: {meeting.speakers.length}
        </p>
      </Link>
      <form action={deleteMeeting} className="flex items-center pr-4">
        <input type="hidden" name="id" value={meeting.id} />
        <button
          type="submit"
          aria-label={`Delete meeting on ${meeting.date}`}
          className="text-xs text-red-600 hover:underline"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
