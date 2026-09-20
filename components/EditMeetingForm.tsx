'use client';

import { useActionState } from 'react';
import { updateMeeting, MeetingFormState } from '@/lib/actions';
import MeetingForm from '@/components/MeetingForm';
import { SacramentMeeting } from '@/lib/types';

const initialState: MeetingFormState = {};

export default function EditMeetingForm({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);
  const [state, formAction, isPending] = useActionState(
    updateMeetingWithId,
    initialState
  );

  return (
    <MeetingForm
      state={state}
      formAction={formAction}
      isPending={isPending}
      defaultValues={meeting}
      submitLabel="Save Changes"
    />
  );
}
