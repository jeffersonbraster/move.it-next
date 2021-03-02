import { useState, useEffect, useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/Countdown.module.css";

export const Countdown = () => {
  const {
    minutos,
    segundos,
    isActive,
    hasFinished,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  const [minutoLeft, minutoRight] = String(minutos).padStart(2, "0").split("");
  const [segundosLeft, segundosRight] = String(segundos)
    .padStart(2, "0")
    .split("");

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minutoLeft}</span>
          <span>{minutoRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{segundosLeft}</span>
          <span>{segundosRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.startCount}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.startCount} ${styles.startCountActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.startCount}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
};
