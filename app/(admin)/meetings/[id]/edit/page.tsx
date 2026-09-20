import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import EditMeetingForm from '@/components/EditMeetingForm';

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    notFound();
  }

  const meeting = await getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--color-ink)] mb-6">
        Edit Meeting
      </h1>
      <EditMeetingForm meeting={meeting} />
    </div>
  );
}
