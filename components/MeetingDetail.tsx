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
    <article className="max-w-2xl mx-auto p-6 print:p-0">
      <header className="mb-6 text-center">
        <h2 className="text-2xl font-bold">{typeLabels[meeting.meetingType]}</h2>
        <p className="text-slate-600">{meeting.date}</p>
        <p className="text-sm text-slate-500 mt-1">
          Presiding: {meeting.presiding} &middot; Conducting: {meeting.conducting}
        </p>
      </header>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mb-4">
          <h3 className="font-semibold mb-1">Announcements</h3>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {meeting.announcements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-2">
        <p>
          <span className="font-semibold">Opening Hymn:</span> #
          {meeting.openingHymn.number} - {meeting.openingHymn.title}
        </p>
        <p>
          <span className="font-semibold">Opening Prayer:</span>{' '}
          {meeting.openingPrayer}
        </p>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section className="mb-4">
          <h3 className="font-semibold mb-1">Ward Business</h3>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {meeting.wardBusiness.map((wb, i) => (
              <li key={i}>{wb.description}</li>
            ))}
          </ul>
        </section>
      )}

      {meeting.stakeBusiness && (
        <p className="mb-4 text-sm italic text-slate-600">
          Stake business will be conducted.
        </p>
      )}

      <section className="mb-2">
        <p>
          <span className="font-semibold">Sacrament Hymn:</span> #
          {meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}
        </p>
      </section>

      {meeting.speakers.length > 0 && (
        <section className="mb-4">
          <h3 className="font-semibold mb-1">Speakers &amp; Musical Numbers</h3>
          <ol className="list-decimal list-inside text-sm text-slate-700">
            {meeting.speakers.map((s, i) => (
              <li key={i}>
                {s.type === 'musical-number' ? 'Musical Number' : s.name}
                {s.topic ? ` \u2014 ${s.topic}` : ''}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section>
        <p>
          <span className="font-semibold">Closing Hymn:</span> #
          {meeting.closingHymn.number} - {meeting.closingHymn.title}
        </p>
        <p>
          <span className="font-semibold">Closing Prayer:</span>{' '}
          {meeting.closingPrayer}
        </p>
      </section>

      <div className="mt-6 text-center print:hidden">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
        >
          Print Program
        </button>
      </div>
    </article>
  );
}
