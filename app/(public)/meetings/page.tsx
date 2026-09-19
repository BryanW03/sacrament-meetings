import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import { getMeetings } from '@/lib/meetings-db';

const PAGE_SIZE = 5;

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query, page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  const { meetings, totalCount } = await getMeetings({
    query,
    page,
    pageSize: PAGE_SIZE,
  });

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">All Sacrament Meetings</h2>

      <MeetingSearch />

      <div className="grid gap-4 sm:grid-cols-2 mt-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>

      {meetings.length === 0 && (
        <p className="text-[var(--color-muted)] mt-6">
          No meetings match your search.
        </p>
      )}

      <Pagination currentPage={page} totalPages={totalPages} />
    </section>
  );
}
