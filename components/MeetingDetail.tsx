'use client';

import { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

const typeLabels: Record<SacramentMeeting['meetingType'], string> = {
  testimony: 'Testimony Meeting',
  regular: 'Regular Meeting',
  stake: 'Stake Meeting',
  general: 'General Conference',
};

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="max-w-xl mx-auto bg-white border border-[var(--color-line)] px-8 py-10 print:border-0 print:p-0">
      <header className="text-center mb-8 pb-6 border-b-2 border-[#9c7a3c]">
        <p className="text-xs tracking-widest text-[var(--color-muted)] mb-2">
          {typeLabels[meeting.meetingType]}
        </p>
        <h2 className="font-display text-3xl text-[var(--color-ink)]">
          Sacrament Meeting
        </h2>
        <p className="text-[var(--color-muted)] mt-1">{meeting.date}</p>
        <p className="text-sm text-[var(--color-muted)] mt-3">
          Presiding: {meeting.presiding} &middot; Conducting: {meeting.conducting}
        </p>
      </header>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mb-6 pb-6 border-b border-[var(--color-line)]">
          <h3 className="font-display text-sm text-[#9c7a3c] mb-2">
            Announcements
          </h3>
          <ul className="space-y-1 text-sm text-[var(--color-ink)]">
            {meeting.announcements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-6 pb-6 border-b border-[var(--color-line)] space-y-1">
        <p>
          <span className="text-[var(--color-muted)]">Opening Hymn</span>{' '}
          #{meeting.openingHymn.number} &middot; {meeting.openingHymn.title}
        </p>
        <p>
          <span className="text-[var(--color-muted)]">Opening Prayer</span>{' '}
          {meeting.openingPrayer}
        </p>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section className="mb-6 pb-6 border-b border-[var(--color-line)]">
          <h3 className="font-display text-sm text-[#9c7a3c] mb-2">
            Ward Business
          </h3>
          <ul className="space-y-1 text-sm text-[var(--color-ink)]">
            {meeting.wardBusiness.map((wb, i) => (
              <li key={i}>{wb.description}</li>
            ))}
          </ul>
        </section>
      )}

      {meeting.stakeBusiness && (
        <p className="mb-6 pb-6 border-b border-[var(--color-line)] text-sm italic text-[var(--color-muted)]">
          Stake business will be conducted.
        </p>
      )}

      <section className="mb-6 pb-6 border-b border-[var(--color-line)]">
        <p>
          <span className="text-[var(--color-muted)]">Sacrament Hymn</span>{' '}
          #{meeting.sacramentHymn.number} &middot; {meeting.sacramentHymn.title}
        </p>
      </section>

      {meeting.speakers.length > 0 && (
        <section className="mb-6 pb-6 border-b border-[var(--color-line)]">
          <h3 className="font-display text-sm text-[#9c7a3c] mb-2">
            Speakers &amp; Musical Numbers
          </h3>
          <ol className="space-y-1 text-sm text-[var(--color-ink)] list-decimal list-inside">
            {meeting.speakers.map((s, i) => (
              <li key={i}>
                {s.type === 'musical-number' ? 'Musical Number' : s.name}
                {s.topic ? ` \u2014 ${s.topic}` : ''}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="space-y-1">
        <p>
          <span className="text-[var(--color-muted)]">Closing Hymn</span>{' '}
          #{meeting.closingHymn.number} &middot; {meeting.closingHymn.title}
        </p>
        <p>
          <span className="text-[var(--color-muted)]">Closing Prayer</span>{' '}
          {meeting.closingPrayer}
        </p>
      </section>

      <div className="mt-8 text-center print:hidden">
        <button
          onClick={() => window.print()}
          className="px-5 py-2 border border-[#1e3a5f] text-[#1e3a5f] text-sm hover:bg-[#1e3a5f] hover:text-white transition-colors"
        >
          Print Program
        </button>
      </div>
    </article>
  );
}
