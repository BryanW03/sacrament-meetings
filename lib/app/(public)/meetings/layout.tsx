import NavLinks from '@/components/NavLinks';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavLinks />
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}
