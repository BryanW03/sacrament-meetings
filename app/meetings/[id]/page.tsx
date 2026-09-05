import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { SacramentMeeting } from '@/lib/types';
import { getBaseUrl } from '@/lib/get-base-url';

async function getMeeting(id: string): Promise<SacramentMeeting | null> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/meetings/${id}`, { cache: 'no-store' });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Failed to fetch meeting');
  }

  return res.json();
}

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = await getMeeting(id);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
