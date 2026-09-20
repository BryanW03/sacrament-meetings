'use client';

import { useActionState } from 'react';
import { createMeeting, MeetingFormState } from '@/lib/actions';
import MeetingForm from '@/components/MeetingForm';

const initialState: MeetingFormState = {};

export default function NewMeetingPage() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--color-ink)] mb-6">
        Create Meeting
      </h1>
      <MeetingForm
        state={state}
        formAction={formAction}
        isPending={isPending}
        submitLabel="Create Meeting"
      />
    </div>
  );
}
