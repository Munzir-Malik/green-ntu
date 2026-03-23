const KEYS = {
  COMPLETED: "green_ntu_completed",
  CHALLENGE_INDEX: "green_ntu_challenge_index",
  UNLOCKED_TITLE: "green_ntu_unlocked_title",
  UNLOCKED_COUNT: "green_ntu_unlocked_count",
  LAST_TIP: "green_ntu_last_tip",
};

export function getCompleted(): number {
  return parseInt(localStorage.getItem(KEYS.COMPLETED) || "0", 10);
}

export function setCompleted(val: number): void {
  localStorage.setItem(KEYS.COMPLETED, String(val));
}

export function getChallengeIndex(): number {
  return parseInt(localStorage.getItem(KEYS.CHALLENGE_INDEX) || "0", 10);
}

export function setChallengeIndex(val: number): void {
  localStorage.setItem(KEYS.CHALLENGE_INDEX, String(val));
}

export function getUnlockedTitle(): string {
  return localStorage.getItem(KEYS.UNLOCKED_TITLE) || "لا يوجد لقب بعد";
}

export function setUnlockedTitle(val: string): void {
  localStorage.setItem(KEYS.UNLOCKED_TITLE, val);
}

export function getUnlockedCount(): number {
  return parseInt(localStorage.getItem(KEYS.UNLOCKED_COUNT) || "0", 10);
}

export function setUnlockedCount(val: number): void {
  localStorage.setItem(KEYS.UNLOCKED_COUNT, String(val));
}

export function getLastTip(): number {
  return parseInt(localStorage.getItem(KEYS.LAST_TIP) || "-1", 10);
}

export function setLastTip(val: number): void {
  localStorage.setItem(KEYS.LAST_TIP, String(val));
}

export function resetProgress(): void {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}
