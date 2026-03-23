import { useState, useMemo } from "react";
import { TIPS } from "@/data/tips";
import type { Page } from "@/hooks/useAppState";

interface TipsPageProps {
  setPage: (page: Page) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TipsPage({ setPage }: TipsPageProps) {
  const shuffledTips = useMemo(() => shuffle(TIPS), []);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="page-content" dir="rtl">
      <div className="page-header">
        <button className="btn btn-ghost back-btn" onClick={() => setPage("home")}>← رجوع</button>
        <h2 className="page-title">💡 النصائح البيئية</h2>
        <p className="page-subtitle">٣٠ نصيحة لحياة جامعية أكثر استدامة</p>
      </div>

      <div className="tips-grid">
        {shuffledTips.map((tip, idx) => (
          <div key={idx} className="card tip-card-item animate-fade-in-up" style={{ animationDelay: `${idx * 0.03}s` }}>
            <div className="tip-number">#{idx + 1}</div>
            <p className="tip-text">{tip}</p>
            <button
              className={`btn ${copiedIndex === idx ? "btn-success" : "btn-secondary"} copy-btn`}
              onClick={() => handleCopy(tip, idx)}
            >
              {copiedIndex === idx ? "تم النسخ ✓" : "نسخ"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
