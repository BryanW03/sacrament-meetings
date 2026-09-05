import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';

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
    <Link
      href={`/meetings/${meeting.id}`}
      className="block border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-900">{meeting.date}</span>
        <span className="text-xs uppercase tracking-wide text-slate-500">
          {typeLabels[meeting.meetingType]}
        </span>
      </div>
      <p className="text-sm text-slate-600 mt-1">Presiding: {meeting.presiding}</p>
      <p className="text-sm text-slate-600">Speakers: {meeting.speakers.length}</p>
    </Link>
  );
}
