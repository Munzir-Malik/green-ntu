import { useEffect, useRef, useState } from "react";
import { TIPS } from "@/data/tips";
import type { Page } from "@/hooks/useAppState";

const INTRO_TEXT =
  "هذا التطبيق يساعد طلبة الجامعة على تبني عادات بيئية بسيطة، وتحويل السلوك اليومي إلى خطوة عملية نحو بيئة جامعية أنظف وأكثر استدامة.";

interface HomePageProps {
  setPage: (page: Page) => void;
  completed: number;
  unlockedTitle: string;
  currentTipIndex: number;
  getRandomTip: () => void;
}

export default function HomePage({ setPage, completed, unlockedTitle, currentTipIndex, getRandomTip }: HomePageProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const indexRef = useRef(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    indexRef.current = 0;
    setTypingDone(false);
    const interval = setInterval(() => {
      if (indexRef.current < INTRO_TEXT.length) {
        setDisplayedText(INTRO_TEXT.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(TIPS[currentTipIndex]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-content" dir="rtl">
      <div className="hero-section">
        <div className="globe-icon" aria-label="globe with graduation cap">🌍🎓</div>
        <h1 className="app-title">الجامعة الخضراء | Green NTU</h1>
        <div className="typewriter-container">
          <p className="intro-text">{displayedText}<span className={typingDone ? "cursor-hidden" : "cursor"}>|</span></p>
        </div>
        {typingDone && (
          <p className="sub-text animate-fade-in">ابدأ الآن، وساهم في جعل بيئتنا الجامعية أجمل.</p>
        )}
      </div>

      <div className="cards-row">
        <div className="card tip-card">
          <div className="card-label">💡 نصيحة اليوم</div>
          <p className="tip-text">{TIPS[currentTipIndex]}</p>
          <div className="card-actions">
            <button className="btn btn-secondary" onClick={getRandomTip}>نصيحة جديدة 🔄</button>
            <button className="btn btn-ghost" onClick={handleCopy}>{copied ? "تم النسخ ✓" : "نسخ"}</button>
          </div>
        </div>

        <div className="card progress-card">
          <div className="card-label">📊 تقدمك</div>
          <div className="progress-stat">
            <span className="stat-number">{completed}</span>
            <span className="stat-label">تحدي مكتمل</span>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar" style={{ width: `${(completed / 30) * 100}%` }} />
          </div>
          <div className="title-badge">{unlockedTitle}</div>
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-primary nav-btn" onClick={() => setPage("tips")}>
          <span>📋</span> النصائح
        </button>
        <button className="btn btn-primary nav-btn" onClick={() => setPage("challenges")}>
          <span>🎯</span> التحديات
        </button>
        <button className="btn btn-primary nav-btn" onClick={() => setPage("stats")}>
          <span>📈</span> الإحصائيات
        </button>
      </div>
    </div>
  );
}
