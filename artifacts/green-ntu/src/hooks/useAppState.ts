import { useState, useCallback } from "react";
import {
  getCompleted, setCompleted,
  getChallengeIndex, setChallengeIndex,
  getUnlockedTitle, setUnlockedTitle,
  getUnlockedCount, setUnlockedCount,
  getLastTip, setLastTip,
} from "@/lib/storage";
import { TIPS } from "@/data/tips";
import { CHALLENGES, TITLES } from "@/data/challenges";

export type Page = "home" | "tips" | "challenges" | "stats";

export interface TitleUnlock {
  message: string;
  motivation: string;
}

export function useAppState() {
  const [page, setPage] = useState<Page>("home");
  const [completed, setCompletedState] = useState(() => getCompleted());
  const [challengeIndex, setChallengeIndexState] = useState(() => getChallengeIndex());
  const [unlockedTitle, setUnlockedTitleState] = useState(() => getUnlockedTitle());
  const [unlockedCount, setUnlockedCountState] = useState(() => getUnlockedCount());
  const [currentTipIndex, setCurrentTipIndex] = useState(() => {
    const last = getLastTip();
    let next = Math.floor(Math.random() * TIPS.length);
    if (next === last && TIPS.length > 1) next = (next + 1) % TIPS.length;
    setLastTip(next);
    return next;
  });
  const [titleUnlock, setTitleUnlock] = useState<TitleUnlock | null>(null);
  const [challengeMessage, setChallengeMessage] = useState<{ text: string; type: "success" | "info" } | null>(null);

  const getRandomTip = useCallback(() => {
    const last = currentTipIndex;
    let next = Math.floor(Math.random() * TIPS.length);
    if (next === last && TIPS.length > 1) next = (next + 1) % TIPS.length;
    setCurrentTipIndex(next);
    setLastTip(next);
  }, [currentTipIndex]);

  const acceptChallenge = useCallback(() => {
    const newCompleted = completed + 1;
    const newIndex = challengeIndex + 1;
    setCompleted(newCompleted);
    setChallengeIndex(newIndex);
    setCompletedState(newCompleted);
    setChallengeIndexState(newIndex);
    setChallengeMessage({ text: "رائع! لقد أتممت التحدي بنجاح. استمر في هذا المسار المشرف! 🌿", type: "success" });

    const newTitle = TITLES.find(t => t.threshold === newCompleted);
    if (newTitle) {
      const newCount = unlockedCount + 1;
      setUnlockedTitle(newTitle.title);
      setUnlockedCount(newCount);
      setUnlockedTitleState(newTitle.title);
      setUnlockedCountState(newCount);
      setTimeout(() => {
        setTitleUnlock({ message: newTitle.message, motivation: newTitle.motivation });
      }, 600);
    }
  }, [completed, challengeIndex, unlockedCount]);

  const refuseChallenge = useCallback(() => {
    setChallengeMessage({ text: "لا بأس! كل يوم فرصة جديدة. ستستطيع قبول هذا التحدي قريبًا. 💪", type: "info" });
  }, []);

  const dismissTitleUnlock = useCallback(() => {
    setTitleUnlock(null);
  }, []);

  const dismissChallengeMessage = useCallback(() => {
    setChallengeMessage(null);
  }, []);

  const remaining = CHALLENGES.length - completed;
  const isDone = challengeIndex >= CHALLENGES.length;
  const currentChallenge = isDone ? null : CHALLENGES[challengeIndex];

  return {
    page, setPage,
    completed, challengeIndex,
    unlockedTitle, unlockedCount,
    currentTipIndex, getRandomTip,
    titleUnlock, dismissTitleUnlock,
    challengeMessage, dismissChallengeMessage,
    acceptChallenge, refuseChallenge,
    remaining, isDone, currentChallenge,
  };
}
