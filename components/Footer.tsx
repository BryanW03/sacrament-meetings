export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] text-[var(--color-muted)] text-xs text-center py-5 mt-12 print:hidden">
      <p>Sacrament Meeting Planner &middot; {new Date().getFullYear()}</p>
    </footer>
  );
}
