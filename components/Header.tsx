export default function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-[#1e3a5f] text-white px-6 py-5 border-b-2 border-[#9c7a3c] print:hidden">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <h1 className="font-display text-2xl tracking-wide">Almirante Ward</h1>
        <p className="text-sm text-white/70">{today}</p>
      </div>
    </header>
  );
}
