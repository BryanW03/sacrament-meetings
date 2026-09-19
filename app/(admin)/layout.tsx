export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-6">
      <p className="text-xs tracking-widest text-[var(--color-gold)] mb-4">
        Leader Tools
      </p>
      {children}
    </div>
  );
}
