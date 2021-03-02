import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/CompletedChallenges.module.css";

export const CompletedChallenges = () => {
  const { chanllengesCompleted } = useContext(ChallengesContext);

  return (
    <div className={styles.completedContainer}>
      <span>Desafios completos</span>
      <span>{chanllengesCompleted}</span>
    </div>
  );
};
