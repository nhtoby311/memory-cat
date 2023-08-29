import { useEffect, useMemo } from "react";
import Modal from "../../../components/Modal/Modal";
import useStore from "../../../store/store";
import styles from "./EndScreen.module.css";
import Button from "../../../components/Button/Button";

export default function EndScreen() {
  const gameMode = useStore((state) => state.currentGameMode);
  const endGame = useStore((state) => state.endGame);
  const winner = useStore((state) => state.winnerData as any);
  const setWinner = useStore((state) => state.setWinnerData);

  const player1Score = useStore((state) => state.player1Score);
  const player2Score = useStore((state) => state.player2Score);

  useEffect(() => {
    if (endGame) {
      if (gameMode === "single") {
        setWinner({ time: 20 });
      } else if (gameMode === "multi") {
        const playerWinner =
          player1Score > player2Score ? "player1" : "player2";
        setWinner({
          player: playerWinner,
          score: Math.max(player1Score, player2Score),
        });
      }
    }
  }, [endGame]);

  const variantWinnerType = useMemo(() => {
    if (winner) {
      if (gameMode === "single") {
        return "single";
      } else if (gameMode === "multi") {
        if (winner.player === "player1") {
          return "player1";
        } else if (winner.player === "player2") {
          return "player2";
        }
      }
    }
  }, [winner]);

  return (
    <Modal>
      <div className={styles.wrapper}>
        <div className={styles.container} data-variant={variantWinnerType}>
          <div className={styles.innerCont}>
            <h3 className={styles.complete}>Complete</h3>
            {gameMode === "single" ? (
              <p className={styles.content}>Time: {winner?.time}</p>
            ) : (
              <p className={styles.content}>{winner?.player} won!</p>
            )}
            <div className={styles.btnCont}>
              <Button onClickCB={() => {}} title="New Game" />
              <Button
                onClickCB={() => {}}
                title={gameMode === "multi" ? "Single Player" : "Multiplayer"}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}