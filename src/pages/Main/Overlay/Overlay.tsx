import { motion } from "framer-motion";
import MenuSVG from "../../../SVG/MenuSVG";
import useStore from "../../../store/store";
import styles from "./Overlay.module.css";

export default function Overlay() {
  const gameMode = useStore((state) => state.currentGameMode);

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
        <div>Restart Game</div>
        <div className={styles.svgBubble}>
          <MenuSVG color="white" />
        </div>
      </div>
    </div>
  );
}

const SingleDisplay = () => {
  return (
    <div className={styles.display}>
      <p className={styles.currentCounter}>00:20</p>
      <p className={styles.highCounter}>Best 00:12</p>
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
