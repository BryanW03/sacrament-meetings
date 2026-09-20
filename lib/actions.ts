'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from './meetings-db';
import { MeetingType } from './types';

// Zod schema validating the raw form fields. Nested objects (hymns) are
// flattened into individual fields on the form, then reassembled below.
const MeetingFormSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid date (YYYY-MM-DD).'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general'], {
  error: 'Choose a valid meeting type.',
}),
  presiding: z.string().min(1, 'Presiding is required.'),
  conducting: z.string().min(1, 'Conducting is required.'),
  announcements: z.string().optional(),
  openingHymnNumber: z.coerce.number().int().positive('Enter a hymn number.'),
  openingHymnTitle: z.string().min(1, 'Opening hymn title is required.'),
  openingPrayer: z.string().min(1, 'Opening prayer is required.'),
  wardBusiness: z.string().optional(),
  stakeBusiness: z.coerce.boolean().optional(),
  sacramentHymnNumber: z.coerce.number().int().positive('Enter a hymn number.'),
  sacramentHymnTitle: z.string().min(1, 'Sacrament hymn title is required.'),
  speakers: z.string().optional(),
  closingHymnNumber: z.coerce.number().int().positive('Enter a hymn number.'),
  closingHymnTitle: z.string().min(1, 'Closing hymn title is required.'),
  closingPrayer: z.string().min(1, 'Closing prayer is required.'),
});

export type MeetingFormState = {
  message?: string;
  errors?: Record<string, string[]>;
};

function parseLines(value?: string): string[] {
  return (value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

// Speaker lines are entered as "Name;Topic;type" — see the hint text in the form.
function parseSpeakers(value?: string) {
  return parseLines(value).map((line) => {
    const [name, topic, type] = line.split(';').map((part) => part?.trim());
    return {
      name: name ?? '',
      topic: topic ?? '',
      type: (type === 'musical-number' ? 'musical-number' : 'speaker') as
        | 'speaker'
        | 'musical-number',
    };
  });
}

function buildMeetingFromForm(data: z.infer<typeof MeetingFormSchema>) {
  return {
    date: data.date,
    meetingType: data.meetingType as MeetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: parseLines(data.announcements),
    openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
    openingPrayer: data.openingPrayer,
    wardBusiness: parseLines(data.wardBusiness).map((description) => ({
      description,
    })),
    stakeBusiness: Boolean(data.stakeBusiness),
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers: parseSpeakers(data.speakers),
    closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
    closingPrayer: data.closingPrayer,
  };
}

export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const result = MeetingFormSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await addMeeting(buildMeetingFromForm(result.data));
  } catch (error) {
    console.error('Failed to create meeting:', error);
    throw new Error(
      'Something went wrong while saving the meeting. Please try again.'
    );
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const result = MeetingFormSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await updateMeetingInDb(id, buildMeetingFromForm(result.data));
  } catch (error) {
    console.error('Failed to update meeting:', error);
    throw new Error(
      'Something went wrong while saving the meeting. Please try again.'
    );
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'));

  try {
    await deleteMeetingInDb(id);
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error(
      'Something went wrong while deleting the meeting. Please try again.'
    );
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
