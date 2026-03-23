import type { TitleUnlock } from "@/hooks/useAppState";

interface Props {
  unlock: TitleUnlock;
  onDismiss: () => void;
}

export default function TitleUnlockModal({ unlock, onDismiss }: Props) {
  return (
    <div className="modal-overlay" onClick={onDismiss}>
      <div className="modal-card animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="modal-confetti">🎉</div>
        <h2 className="modal-title">{unlock.message}</h2>
        <p className="modal-motivation">{unlock.motivation}</p>
        <button className="btn btn-primary modal-close-btn" onClick={onDismiss}>شكرًا! ✨</button>
      </div>
    </div>
  );
}
