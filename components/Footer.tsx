export default function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-600 text-sm text-center py-4 mt-8 print:hidden">
      <p>&copy; {new Date().getFullYear()} Sacrament Meeting Planner</p>
    </footer>
  );
}
