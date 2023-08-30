import { motion } from "framer-motion";
import MenuSVG from "../../../SVG/MenuSVG";
import useStore from "../../../store/store";
import styles from "./Overlay.module.css";
import useCustomStopwatch from "../../../hooks/useCustomStopwatch";
import { useEffect } from "react";
import { formatTime } from "../../../utils/time";

export default function Overlay() {
  const gameMode = useStore((state) => state.currentGameMode);

  const newGame = useStore((state) => state.newGame);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div></div>

        {gameMode === "single" ? <SingleDisplay /> : <MultiDisplay />}
      </div>

      <div className={styles.middle}>
        <div></div>
        <div className={styles.svgBubble}>
          <MenuSVG color="white" />
        </div>
      </div>

      <div className={styles.bottom}>
        <div
          style={{ pointerEvents: "auto" }}
          onClick={() => {
            newGame(gameMode);
          }}
        >
          Restart Game
        </div>
        <div className={styles.svgBubble}>
          <MenuSVG color="white" />
        </div>
      </div>
    </div>
  );
}

const SingleDisplay = () => {
  const elapsedTime = useStore((state) => state.elapsedTime);
  const setElapsedTime = useStore((state) => state.setElapsedTime);
  const bestTime = useStore((state) => state.bestTime);
  const setBestTime = useStore((state) => state.setBestTime);

  const stopwatch = useCustomStopwatch();

  const endGame = useStore((state) => state.endGame);

  const setWinner = useStore((state) => state.setWinnerData);

  useEffect(() => {
    stopwatch.start();
    return () => {
      stopwatch.stop();
    };
  }, []);

  useEffect(() => {
    if (endGame) {
      stopwatch.pause();
      setWinner({ time: elapsedTime });

      //First time play, no best time yet
      if (bestTime === 0) {
        setBestTime(elapsedTime);
      } else {
        if (elapsedTime < bestTime) {
          setBestTime(elapsedTime);
        }
      }
    }
  }, [endGame]);

  //On reset, which elapsedTime set to 0, restart timer.
  useEffect(() => {
    if (elapsedTime === 0) {
      stopwatch.start();
    }
  }, [elapsedTime]);

  useEffect(() => {
    setElapsedTime(Math.floor(stopwatch.getElapsedStartedTime() / 1000));
  }, [stopwatch.getElapsedStartedTime()]);

  return (
    <div className={styles.display}>
      <p className={styles.currentCounter}>{formatTime(elapsedTime)}</p>
      {bestTime === 0 ? null : (
        <p className={styles.highCounter}>Best {formatTime(bestTime)}</p>
      )}
    </div>
  );
};

const MultiDisplay = () => {
  const currentPlayer = useStore((state) => state.currentPlayerTurn);
  const player1Score = useStore((state) => state.player1Score);
  const player2Score = useStore((state) => state.player2Score);

  return (
    <div className={styles.display} data-player={currentPlayer}>
      <motion.div
        layout
        className={styles.playerCont}
        data-player="player1"
        data-current={currentPlayer === "player1" ? "true" : "false"}
      >
        <p className={styles.playerScore}>{player1Score}</p>
        <p>Player 1</p>
      </motion.div>
      <motion.div
        layout
        className={styles.playerCont}
        data-player="player2"
        data-current={currentPlayer === "player2" ? "true" : "false"}
      >
        <p className={styles.playerScore}>{player2Score}</p>
        <p>Player 2</p>
      </motion.div>
    </div>
  );
};
