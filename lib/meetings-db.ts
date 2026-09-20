import { sql } from './db';
import {
  SacramentMeeting,
  MeetingType,
  Hymn,
  SpeakerItem,
  WardBusinessItem,
} from './types';

interface MeetingRow {
  id: number;
  date: string;
  meeting_type: MeetingType;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: Hymn;
  opening_prayer: string;
  ward_business: WardBusinessItem[] | null;
  stake_business: boolean;
  sacrament_hymn: Hymn;
  speakers: SpeakerItem[] | null;
  closing_hymn: Hymn;
  closing_prayer: string;
}

function mapRow(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: String(row.date).slice(0, 10),
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? undefined,
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export interface GetMeetingsOptions {
  date?: string;
  query?: string;
  page?: number;
  pageSize?: number;
}

export interface GetMeetingsResult {
  meetings: SacramentMeeting[];
  totalCount: number;
}

export async function getMeetings(
  options: GetMeetingsOptions = {}
): Promise<GetMeetingsResult> {
  const { date, query, page = 1, pageSize = 5 } = options;
  const offset = (page - 1) * pageSize;

  if (date) {
    const rows = (await sql`
      SELECT * FROM meetings WHERE date = ${date} ORDER BY date DESC
    `) as unknown as MeetingRow[];
    return { meetings: rows.map(mapRow), totalCount: rows.length };
  }

  if (query) {
    const term = `%${query}%`;

    const rows = (await sql`
      SELECT * FROM meetings
      WHERE presiding ILIKE ${term}
         OR conducting ILIKE ${term}
         OR meeting_type ILIKE ${term}
         OR speakers::text ILIKE ${term}
      ORDER BY date DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `) as unknown as MeetingRow[];

    const countRows = (await sql`
      SELECT COUNT(*)::int AS count FROM meetings
      WHERE presiding ILIKE ${term}
         OR conducting ILIKE ${term}
         OR meeting_type ILIKE ${term}
         OR speakers::text ILIKE ${term}
    `) as unknown as { count: number }[];

    return {
      meetings: rows.map(mapRow),
      totalCount: countRows[0]?.count ?? 0,
    };
  }

  const rows = (await sql`
    SELECT * FROM meetings ORDER BY date DESC LIMIT ${pageSize} OFFSET ${offset}
  `) as unknown as MeetingRow[];

  const countRows = (await sql`
    SELECT COUNT(*)::int AS count FROM meetings
  `) as unknown as { count: number }[];

  return { meetings: rows.map(mapRow), totalCount: countRows[0]?.count ?? 0 };
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | undefined> {
  const rows = (await sql`
    SELECT * FROM meetings WHERE id = ${id}
  `) as unknown as MeetingRow[];
  return rows[0] ? mapRow(rows[0]) : undefined;
}

export async function getCurrentMeeting(): Promise<SacramentMeeting | undefined> {
  const today = new Date();
  const day = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - day);
  const sundayStr = sunday.toISOString().slice(0, 10);

  const exactRows = (await sql`
    SELECT * FROM meetings WHERE date = ${sundayStr}
  `) as unknown as MeetingRow[];
  if (exactRows[0]) return mapRow(exactRows[0]);

  const pastRows = (await sql`
    SELECT * FROM meetings
    WHERE date <= ${sundayStr}
    ORDER BY date DESC
    LIMIT 1
  `) as unknown as MeetingRow[];

  return pastRows[0] ? mapRow(pastRows[0]) : undefined;
}

// --- Mutations (Week 04: now wired to real SQL) ---

export async function addMeeting(
  meeting: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  const rows = (await sql`
    INSERT INTO meetings
      (date, meeting_type, presiding, conducting, announcements,
       opening_hymn, opening_prayer, ward_business, stake_business,
       sacrament_hymn, speakers, closing_hymn, closing_prayer)
    VALUES (
      ${meeting.date},
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ${meeting.announcements ?? []},
      ${JSON.stringify(meeting.openingHymn)}::jsonb,
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      ${JSON.stringify(meeting.speakers)}::jsonb,
      ${JSON.stringify(meeting.closingHymn)}::jsonb,
      ${meeting.closingPrayer}
    )
    RETURNING *
  `) as unknown as MeetingRow[];

  return mapRow(rows[0]);
}

export async function updateMeeting(
  id: number,
  meeting: Partial<SacramentMeeting>
): Promise<SacramentMeeting | undefined> {
  const rows = (await sql`
    UPDATE meetings SET
      date = ${meeting.date},
      meeting_type = ${meeting.meetingType},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      announcements = ${meeting.announcements ?? []},
      opening_hymn = ${JSON.stringify(meeting.openingHymn)}::jsonb,
      opening_prayer = ${meeting.openingPrayer},
      ward_business = ${JSON.stringify(meeting.wardBusiness ?? [])}::jsonb,
      stake_business = ${meeting.stakeBusiness ?? false},
      sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(meeting.speakers ?? [])}::jsonb,
      closing_hymn = ${JSON.stringify(meeting.closingHymn)}::jsonb,
      closing_prayer = ${meeting.closingPrayer}
    WHERE id = ${id}
    RETURNING *
  `) as unknown as MeetingRow[];

  return rows[0] ? mapRow(rows[0]) : undefined;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const rows = (await sql`
    DELETE FROM meetings WHERE id = ${id} RETURNING id
  `) as unknown as { id: number }[];

  return rows.length > 0;
}
