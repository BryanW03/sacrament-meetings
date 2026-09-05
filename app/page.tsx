import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="max-w-3xl mx-auto text-center px-6 py-16">
      <Image
        src="/hero-chapel.jpg"
        alt="Chapel meetinghouse exterior"
        width={800}
        height={450}
        className="rounded-lg mx-auto mb-8"
        priority
      />
      <h2 className="text-3xl font-bold mb-4">Sacrament Meeting Planner</h2>
      <p className="text-slate-600 mb-8">
        Plan, manage, and review sacrament meeting agendas for the ward. View
        current and past programs and print them for meeting day.
      </p>
      <Link
        href="/meetings"
        className="inline-block px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
      >
        View Meetings
      </Link>
    </section>
  );
}
