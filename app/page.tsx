import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="max-w-2xl mx-auto text-center px-6 py-16">
      <Image
        src="/hero-chapel.svg"
        alt="Line illustration of a chapel meetinghouse"
        width={800}
        height={450}
        className="mx-auto mb-10 border border-[var(--color-line)]"
        priority
      />
      <p className="text-xs tracking-widest text-[#9c7a3c] mb-3">
        Almirante Ward
      </p>
      <h2 className="font-display text-4xl text-[var(--color-ink)] mb-4">
        Sacrament Meeting Planner
      </h2>
      <p className="text-[var(--color-muted)] mb-10 leading-relaxed">
        Plan, manage, and review sacrament meeting agendas for the ward. View
        current and past programs and print them for meeting day.
      </p>
      <Link
        href="/meetings"
        className="inline-block px-6 py-3 bg-[#1e3a5f] text-white text-sm tracking-wide hover:bg-[#14283f]"
      >
        View Meetings
      </Link>
    </section>
  );
}
