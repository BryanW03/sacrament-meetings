export default function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between print:hidden">
      <h1 className="text-xl font-semibold">Almirante Ward</h1>
      <p className="text-sm text-slate-300">{today}</p>
    </header>
  );
}
