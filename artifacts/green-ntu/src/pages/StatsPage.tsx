import { CHALLENGES, TITLES } from "@/data/challenges";
import type { Page } from "@/hooks/useAppState";

interface StatsPageProps {
  setPage: (page: Page) => void;
  completed: number;
  unlockedTitle: string;
  unlockedCount: number;
}

export default function StatsPage({ setPage, completed, unlockedTitle, unlockedCount }: StatsPageProps) {
  const remaining = CHALLENGES.length - completed;
  const progressPercent = (completed / CHALLENGES.length) * 100;

  return (
    <div className="page-content" dir="rtl">
      <div className="page-header">
        <button className="btn btn-ghost back-btn" onClick={() => setPage("home")}>← رجوع</button>
        <h2 className="page-title">📈 الإحصائيات</h2>
        <p className="page-subtitle">ملخص رحلتك البيئية</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card animate-fade-in-up">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{completed}</div>
          <div className="stat-desc">تحدي مكتمل</div>
        </div>
        <div className="stat-card animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="stat-icon">⏳</div>
          <div className="stat-value">{remaining}</div>
          <div className="stat-desc">تحدي متبقي</div>
        </div>
        <div className="stat-card animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="stat-icon">🏅</div>
          <div className="stat-value">{unlockedCount}</div>
          <div className="stat-desc">لقب مفتوح من ٣</div>
        </div>
      </div>

      <div className="card progress-summary-card animate-fade-in">
        <div className="card-label">التقدم الكلي</div>
        <div className="big-progress-counter">{completed} / {CHALLENGES.length}</div>
        <div className="progress-bar-wrap large">
          <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="progress-percent">{Math.round(progressPercent)}%</div>
      </div>

      <div className="card title-card animate-fade-in">
        <div className="card-label">لقبك الحالي</div>
        <div className="current-title-display">{unlockedTitle}</div>
      </div>

      <div className="titles-section">
        <h3 className="section-title">الألقاب</h3>
        <div className="titles-list">
          {TITLES.map((t) => {
            const unlocked = completed >= t.threshold;
            return (
              <div key={t.threshold} className={`title-item ${unlocked ? "title-unlocked" : "title-locked"}`}>
                <div className="title-status">{unlocked ? "🔓" : "🔒"}</div>
                <div className="title-info">
                  <div className="title-name">{t.title}</div>
                  <div className="title-req">بعد {t.threshold} تحدي</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
