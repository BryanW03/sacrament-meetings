import { SacramentMeeting } from './types';

// Temporary in-memory data. This will be replaced by a real database
// in a later assignment.
const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-08-02',
    meetingType: 'regular',
    presiding: 'Bishop Ramirez',
    conducting: 'Elder Torres, First Counselor',
    announcements: [
      'Ward temple day this Saturday',
      'Youth activity Friday at 6pm',
    ],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Sister Fernandez',
    wardBusiness: [
      { description: 'Sustaining of new Primary teacher, Sister Gomez' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [
      { name: 'Brother Diaz', topic: 'Faith in Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: 'Musical Number', type: 'musical-number' },
      { name: 'Sister Alvarez', topic: 'Enduring to the End', type: 'speaker' },
    ],
    closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
    closingPrayer: 'Brother Nunez',
  },
  {
    id: 2,
    date: '2026-08-09',
    meetingType: 'testimony',
    presiding: 'Bishop Ramirez',
    conducting: 'Bishop Ramirez',
    announcements: ['Fast and testimony meeting today'],
    openingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    openingPrayer: 'Brother Castillo',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: 'In Humility, Our Savior' },
    speakers: [],
    closingHymn: { number: 133, title: 'How Firm a Foundation' },
    closingPrayer: 'Sister Marte',
  },
  {
    id: 3,
    date: '2026-08-16',
    meetingType: 'regular',
    presiding: 'Bishop Ramirez',
    conducting: 'Elder Pena, Second Counselor',
    announcements: ['Missionary farewell for Elder Cruz next week'],
    openingHymn: { number: 89, title: "Our Savior's Love" },
    openingPrayer: 'Sister Ortiz',
    wardBusiness: [
      { description: 'Release of Brother Vargas as Elders Quorum secretary' },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 174,
      title: "'Twas on That Dark, That Doleful Night",
    },
    speakers: [{ name: 'Elder Cruz', topic: 'Missionary farewell', type: 'speaker' }],
    closingHymn: { number: 66, title: 'Rejoice, the Lord Is King!' },
    closingPrayer: 'Brother Reyes',
  },
  {
    id: 4,
    date: '2026-08-23',
    meetingType: 'stake',
    presiding: 'Stake President Medina',
    conducting: 'Stake President Medina',
    announcements: ['Combined stake conference broadcast'],
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Sister Paulino',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      {
        name: 'Stake President Medina',
        topic: 'Stake conference address',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 249, title: 'Called to Serve' },
    closingPrayer: 'Brother Guzman',
  },
  {
    id: 5,
    date: '2026-08-30',
    meetingType: 'regular',
    presiding: 'Bishop Ramirez',
    conducting: 'Elder Torres, First Counselor',
    announcements: ['Primary program next Sunday'],
    openingHymn: { number: 92, title: 'Now Let Us Rejoice' },
    openingPrayer: 'Brother Feliz',
    wardBusiness: [
      { description: 'Sustaining of new Sunday School president, Brother Mejia' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'While of These Emblems We Partake' },
    speakers: [
      {
        name: 'Sister Rosario',
        topic: 'The Atonement of Jesus Christ',
        type: 'speaker',
      },
      { name: 'Ward Choir', topic: 'Musical Number', type: 'musical-number' },
    ],
    closingHymn: { number: 246, title: 'Love One Another' },
    closingPrayer: 'Sister Lantigua',
  },
];

export function getMeetings(date?: string): SacramentMeeting[] {
  if (date) {
    return meetings.filter((m) => m.date === date);
  }
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((m) => m.id === id);
}

// Finds the meeting for the most recent Sunday on or before today.
export function getCurrentMeeting(): SacramentMeeting | undefined {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - day);
  const sundayStr = sunday.toISOString().slice(0, 10);

  const exact = meetings.find((m) => m.date === sundayStr);
  if (exact) return exact;

  const past = meetings
    .filter((m) => m.date <= sundayStr)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return past[0];
}
