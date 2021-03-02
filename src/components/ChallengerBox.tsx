import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/ChallengerBox.module.css";

export const ChallengerBox = () => {
  const {
    activeChanllenger,
    resetChanllenger,
    completeChanllenge,
  } = useContext(ChallengesContext);

  const { resetCountdown } = useContext(CountdownContext);

  function handleChanllengeSucceeded() {
    completeChanllenge();
    resetCountdown();
  }

  function handleChanllengeFailed() {
    resetChanllenger();
    resetCountdown();
  }

  return (
    <div className={styles.challengerBoxContainer}>
      {activeChanllenger ? (
        <div className={styles.chanllengeActive}>
          <header>Ganhe {activeChanllenger.amount}xp</header>

          <main>
            <img src={`icons/${activeChanllenger.type}.svg`} alt="corpo" />
            <strong>Novo desafio</strong>
            <p>{activeChanllenger.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.chanllengeFailedButton}
              onClick={handleChanllengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.chanllengeSuccessButton}
              onClick={handleChanllengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengerBoxNotActive}>
          <strong>Finalize um ciclo para receber novos desafios</strong>
          <p>
            <img src="icons/level-up.svg" alt="level up" />
            Avance de level ao completar novos desafios..
          </p>
        </div>
      )}
    </div>
  );
};
