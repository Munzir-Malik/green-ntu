import { useAppState } from "@/hooks/useAppState";
import HomePage from "@/pages/HomePage";
import TipsPage from "@/pages/TipsPage";
import ChallengesPage from "@/pages/ChallengesPage";
import StatsPage from "@/pages/StatsPage";
import Navbar from "@/components/Navbar";
import TitleUnlockModal from "@/components/TitleUnlockModal";

function App() {
  const state = useAppState();

  return (
    <div className="app-shell">
      <div className="page-container">
        {state.page === "home" && (
          <HomePage
            setPage={state.setPage}
            completed={state.completed}
            unlockedTitle={state.unlockedTitle}
            currentTipIndex={state.currentTipIndex}
            getRandomTip={state.getRandomTip}
          />
        )}
        {state.page === "tips" && (
          <TipsPage setPage={state.setPage} />
        )}
        {state.page === "challenges" && (
          <ChallengesPage
            setPage={state.setPage}
            completed={state.completed}
            challengeIndex={state.challengeIndex}
            challengeOrder={state.challengeOrder}
            currentChallenge={state.currentChallenge}
            isDone={state.isDone}
            acceptChallenge={state.acceptChallenge}
            refuseChallenge={state.refuseChallenge}
            challengeMessage={state.challengeMessage}
            dismissChallengeMessage={state.dismissChallengeMessage}
          />
        )}
        {state.page === "stats" && (
          <StatsPage
            setPage={state.setPage}
            completed={state.completed}
            unlockedTitle={state.unlockedTitle}
            unlockedCount={state.unlockedCount}
          />
        )}
      </div>

      <Navbar page={state.page} setPage={state.setPage} />

      {state.titleUnlock && (
        <TitleUnlockModal
          unlock={state.titleUnlock}
          onDismiss={state.dismissTitleUnlock}
        />
      )}
    </div>
  );
}

export default App;
