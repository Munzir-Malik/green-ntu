import { CHALLENGES } from "@/data/challenges";
import type { Page } from "@/hooks/useAppState";

interface ChallengesPageProps {
  setPage: (page: Page) => void;
  completed: number;
  challengeIndex: number;
  currentChallenge: string | null;
  isDone: boolean;
  acceptChallenge: () => void;
  refuseChallenge: () => void;
  challengeMessage: { text: string; type: "success" | "info" } | null;
  dismissChallengeMessage: () => void;
}

export default function ChallengesPage({
  setPage, completed, challengeIndex, currentChallenge, isDone,
  acceptChallenge, refuseChallenge, challengeMessage, dismissChallengeMessage,
}: ChallengesPageProps) {
  const progressPercent = (completed / CHALLENGES.length) * 100;

  return (
    <div className="page-content" dir="rtl">
      <div className="page-header">
        <button className="btn btn-ghost back-btn" onClick={() => setPage("home")}>← رجوع</button>
        <h2 className="page-title">🎯 التحديات البيئية</h2>
        <p className="page-subtitle">أكمل التحديات بالترتيب لتفتح ألقابك الخضراء، نرجوا أن تكون صادقا في اكمال التحديات</p>
      </div>

      <div className="challenges-desktop-layout">
        <div className="challenges-main-col">
          <div className="challenge-progress-section">
            <div className="progress-counter">{completed} / {CHALLENGES.length}</div>
            <div className="progress-bar-wrap">
              <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {challengeMessage && (
            <div className={`message-card ${challengeMessage.type === "success" ? "message-success" : "message-info"} animate-fade-in`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.2rem' }}>{challengeMessage.type === "success" ? "🌿" : "💡"}</span>
                <p>{challengeMessage.text}</p>
              </div>
              <button className="msg-dismiss" onClick={dismissChallengeMessage}>✕</button>
            </div>
          )}

          {isDone ? (
            <div className="card done-card animate-fade-in">
              <div className="done-icon">🏆</div>
              <h3 className="done-title">أتممت جميع التحديات!</h3>
              <p className="done-text">لقد أثبتت أنك بطل البيئة الجامعية. استمر في نشر الوعي البيئي!</p>
              <button className="btn btn-primary" onClick={() => setPage("stats")}>عرض إحصائياتك</button>
            </div>
          ) : (
            <div className="card challenge-card animate-fade-in">
              <div className="challenge-number">التحدي #{challengeIndex + 1}</div>
              <p className="challenge-text">{currentChallenge}</p>
              <div className="challenge-actions">
                <button className="btn btn-accept" onClick={acceptChallenge}>أكملت التحدي✓</button>
                <button className="btn btn-refuse" onClick={refuseChallenge}>لاحقًا ↩</button>
              </div>
            </div>
          )}
        </div>

        <div className="challenges-history">
          <h3 className="history-title">سجل التحديات</h3>
          <div className="challenges-list">
            {CHALLENGES.map((ch, idx) => {
              const status = idx < completed ? "done" : idx === challengeIndex ? "current" : "locked";
              return (
                <div key={idx} className={`challenge-item challenge-${status}`}>
                  <span className="challenge-item-num">
                    {status === "done" ? "✓" : status === "current" ? "▶" : `${idx + 1}`}
                  </span>
                  <span className="challenge-item-text">{ch}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
