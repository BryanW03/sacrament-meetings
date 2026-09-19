import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

export default async function MeetingPage({
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

  return <MeetingDetail meeting={meeting} />;
}
