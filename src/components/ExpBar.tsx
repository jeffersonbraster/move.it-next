import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/ExpBar.module.css";

export const ExpBar = () => {
  const { currentExperience, expNextLvl } = useContext(ChallengesContext);

  const percentToNextLevel = Math.round(currentExperience * 100) / expNextLvl;

  return (
    <header className={styles.expBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span
          className={styles.currentExp}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{expNextLvl} xp</span>
    </header>
  );
};
