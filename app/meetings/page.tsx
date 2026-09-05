import MeetingCard from '@/components/MeetingCard';
import { SacramentMeeting } from '@/lib/types';
import { getBaseUrl } from '@/lib/get-base-url';

async function getMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch meetings');
  }

  return res.json();
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">All Sacrament Meetings</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </section>
  );
}
