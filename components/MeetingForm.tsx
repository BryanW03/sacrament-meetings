'use client';

import { MeetingFormState } from '@/lib/actions';
import { SacramentMeeting } from '@/lib/types';

interface MeetingFormProps {
  state: MeetingFormState;
  formAction: (formData: FormData) => void;
  isPending: boolean;
  defaultValues?: SacramentMeeting;
  submitLabel?: string;
}

function FieldError({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages || messages.length === 0) return null;
  return (
    <p id={id} className="text-sm text-red-600 mt-1" aria-live="polite">
      {messages[0]}
    </p>
  );
}

const inputClass =
  'w-full border border-[var(--color-line)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-gold)]';

export default function MeetingForm({
  state,
  formAction,
  isPending,
  defaultValues,
  submitLabel = 'Save Meeting',
}: MeetingFormProps) {
  const errors = state.errors ?? {};

  const speakersDefault = defaultValues?.speakers
    .map((s) => `${s.name};${s.topic};${s.type}`)
    .join('\n');
  const wardBusinessDefault = defaultValues?.wardBusiness
    .map((w) => w.description)
    .join('\n');
  const announcementsDefault = defaultValues?.announcements?.join('\n');

  return (
    <form action={formAction} className="space-y-6 max-w-xl">
      {state.message && (
        <p className="text-sm text-red-600" role="alert">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={defaultValues?.date}
          aria-describedby="date-error"
          className={inputClass}
        />
        <FieldError id="date-error" messages={errors.date} />
      </div>

      <div>
        <label htmlFor="meetingType" className="block text-sm font-medium mb-1">
          Meeting Type
        </label>
        <select
          id="meetingType"
          name="meetingType"
          defaultValue={defaultValues?.meetingType ?? 'regular'}
          aria-describedby="meetingType-error"
          className={inputClass}
        >
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General Conference</option>
        </select>
        <FieldError id="meetingType-error" messages={errors.meetingType} />
      </div>

      <div>
        <label htmlFor="presiding" className="block text-sm font-medium mb-1">
          Presiding
        </label>
        <input
          id="presiding"
          name="presiding"
          type="text"
          defaultValue={defaultValues?.presiding}
          aria-describedby="presiding-error"
          className={inputClass}
        />
        <FieldError id="presiding-error" messages={errors.presiding} />
      </div>

      <div>
        <label htmlFor="conducting" className="block text-sm font-medium mb-1">
          Conducting
        </label>
        <input
          id="conducting"
          name="conducting"
          type="text"
          defaultValue={defaultValues?.conducting}
          aria-describedby="conducting-error"
          className={inputClass}
        />
        <FieldError id="conducting-error" messages={errors.conducting} />
      </div>

      <div>
        <label htmlFor="announcements" className="block text-sm font-medium mb-1">
          Announcements (one per line)
        </label>
        <textarea
          id="announcements"
          name="announcements"
          rows={3}
          defaultValue={announcementsDefault}
          aria-describedby="announcements-error"
          className={inputClass}
        />
        <FieldError id="announcements-error" messages={errors.announcements} />
      </div>

      <fieldset className="border border-[var(--color-line)] p-4">
        <legend className="text-sm font-medium px-1">Opening Hymn</legend>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="openingHymnNumber" className="block text-xs mb-1">
              Number
            </label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              defaultValue={defaultValues?.openingHymn.number}
              aria-describedby="openingHymnNumber-error"
              className={inputClass}
            />
            <FieldError
              id="openingHymnNumber-error"
              messages={errors.openingHymnNumber}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="openingHymnTitle" className="block text-xs mb-1">
              Title
            </label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              defaultValue={defaultValues?.openingHymn.title}
              aria-describedby="openingHymnTitle-error"
              className={inputClass}
            />
            <FieldError
              id="openingHymnTitle-error"
              messages={errors.openingHymnTitle}
            />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="openingPrayer" className="block text-sm font-medium mb-1">
          Opening Prayer
        </label>
        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          defaultValue={defaultValues?.openingPrayer}
          aria-describedby="openingPrayer-error"
          className={inputClass}
        />
        <FieldError id="openingPrayer-error" messages={errors.openingPrayer} />
      </div>

      <div>
        <label htmlFor="wardBusiness" className="block text-sm font-medium mb-1">
          Ward Business (one item per line)
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={2}
          defaultValue={wardBusinessDefault}
          aria-describedby="wardBusiness-error"
          className={inputClass}
        />
        <FieldError id="wardBusiness-error" messages={errors.wardBusiness} />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          value="true"
          defaultChecked={defaultValues?.stakeBusiness}
        />
        <label htmlFor="stakeBusiness" className="text-sm">
          Stake business will be conducted
        </label>
      </div>

      <fieldset className="border border-[var(--color-line)] p-4">
        <legend className="text-sm font-medium px-1">Sacrament Hymn</legend>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="sacramentHymnNumber" className="block text-xs mb-1">
              Number
            </label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              defaultValue={defaultValues?.sacramentHymn.number}
              aria-describedby="sacramentHymnNumber-error"
              className={inputClass}
            />
            <FieldError
              id="sacramentHymnNumber-error"
              messages={errors.sacramentHymnNumber}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="sacramentHymnTitle" className="block text-xs mb-1">
              Title
            </label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              defaultValue={defaultValues?.sacramentHymn.title}
              aria-describedby="sacramentHymnTitle-error"
              className={inputClass}
            />
            <FieldError
              id="sacramentHymnTitle-error"
              messages={errors.sacramentHymnTitle}
            />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="speakers" className="block text-sm font-medium mb-1">
          Speakers &amp; Musical Numbers
        </label>
        <p className="text-xs text-[var(--color-muted)] mb-1">
          One per line: Name;Topic;speaker or Name;Topic;musical-number
        </p>
        <textarea
          id="speakers"
          name="speakers"
          rows={3}
          defaultValue={speakersDefault}
          aria-describedby="speakers-error"
          className={inputClass}
        />
        <FieldError id="speakers-error" messages={errors.speakers} />
      </div>

      <fieldset className="border border-[var(--color-line)] p-4">
        <legend className="text-sm font-medium px-1">Closing Hymn</legend>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="closingHymnNumber" className="block text-xs mb-1">
              Number
            </label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              defaultValue={defaultValues?.closingHymn.number}
              aria-describedby="closingHymnNumber-error"
              className={inputClass}
            />
            <FieldError
              id="closingHymnNumber-error"
              messages={errors.closingHymnNumber}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="closingHymnTitle" className="block text-xs mb-1">
              Title
            </label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              defaultValue={defaultValues?.closingHymn.title}
              aria-describedby="closingHymnTitle-error"
              className={inputClass}
            />
            <FieldError
              id="closingHymnTitle-error"
              messages={errors.closingHymnTitle}
            />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="closingPrayer" className="block text-sm font-medium mb-1">
          Closing Prayer
        </label>
        <input
          id="closingPrayer"
          name="closingPrayer"
          type="text"
          defaultValue={defaultValues?.closingPrayer}
          aria-describedby="closingPrayer-error"
          className={inputClass}
        />
        <FieldError id="closingPrayer-error" messages={errors.closingPrayer} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-5 py-2 bg-[#1e3a5f] text-white text-sm hover:bg-[#14283f] disabled:opacity-50"
      >
        {isPending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
