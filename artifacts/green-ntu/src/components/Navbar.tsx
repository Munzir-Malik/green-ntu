import type { Page } from "@/hooks/useAppState";

interface NavbarProps {
  page: Page;
  setPage: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "الرئيسية", icon: "🏠" },
  { id: "tips", label: "النصائح", icon: "💡" },
  { id: "challenges", label: "التحديات", icon: "🎯" },
  { id: "stats", label: "الإحصائيات", icon: "📈" },
];

export default function Navbar({ page, setPage }: NavbarProps) {
  return (
    <nav className="bottom-nav" dir="rtl">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${page === item.id ? "nav-item-active" : ""}`}
          onClick={() => setPage(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
