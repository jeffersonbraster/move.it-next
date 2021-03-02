import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import chanllenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenger {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChanllengesContextData {
  level: number;
  currentExperience: number;
  expNextLvl: number;
  chanllengesCompleted: number;
  activeChanllenger: Challenger;
  levelUp: () => void;
  StartNewChanllenger: () => void;
  resetChanllenger: () => void;
  completeChanllenge: () => void;
  CloseModelLevelUp: () => void;
}

interface ChanllengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  chanllengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChanllengesContextData);

export function ChanllengesProvider({
  children,
  ...rest
}: ChanllengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 0);
  const [currentExperience, setCurrentExpenrience] = useState(
    rest.currentExperience ?? 0
  );
  const [chanllengesCompleted, setChanllengesCompleted] = useState(
    rest.chanllengesCompleted ?? 0
  );

  const [activeChanllenger, setActiveChanllenger] = useState(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const expNextLvl = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("chanllengesCompleted", String(chanllengesCompleted));
  }, [level, currentExperience, chanllengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function CloseModelLevelUp() {
    setIsLevelUpModalOpen(false);
  }

  function StartNewChanllenger() {
    const randomChanllengeIndex = Math.floor(
      Math.random() * chanllenges.length
    );
    const chanllenger = chanllenges[randomChanllengeIndex];

    setActiveChanllenger(chanllenger);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio!!", {
        body: `Valendo ${chanllenger.amount} xp`,
      });
    }
  }

  function resetChanllenger() {
    setActiveChanllenger(null);
  }

  function completeChanllenge() {
    if (!activeChanllenger) {
      return;
    }

    const { amount } = activeChanllenger;

    let finalExp = currentExperience + amount;

    if (finalExp >= expNextLvl) {
      finalExp = finalExp - expNextLvl;
      levelUp();
    }

    setCurrentExpenrience(finalExp);
    setActiveChanllenger(null);
    setChanllengesCompleted(chanllengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        expNextLvl,
        chanllengesCompleted,
        levelUp,
        StartNewChanllenger,
        activeChanllenger,
        resetChanllenger,
        completeChanllenge,
        CloseModelLevelUp,
      }}
    >
      {isLevelUpModalOpen && <LevelUpModal />}
      {children}
    </ChallengesContext.Provider>
  );
}
