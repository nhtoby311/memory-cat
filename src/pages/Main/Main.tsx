import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";
import Modal from "../../components/Modal/Modal";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";
import useStore from "../../store/store";
import Overlay from "./Overlay/Overlay";

import styles from "./Main.module.css";
import Card from "../../components/Card/Card";
import { useCardGame } from "../../hooks/useCardGame";
import useQueryCatImages from "../../hooks/useQueryCatImages";
import usePrevious from "../../hooks/usePrevious";

export default function Main() {
  const gameMode = useStore((state) => state.currentGameMode);
  const setCards = useStore((state) => state.setCards);

  const { isLoading, error, data, isFetching } = useQueryCatImages();

  useEffect(() => {
    if (data) {
      const fomatData = data.map((item: any) => {
        return {
          id: item.id,
          url: item.url,
          isFlipped: false,
          isMatched: false,
        };
      });
      const cloneData = fomatData.map((item: any) => {
        return {
          id: item.id + "cloned",
          url: item.url,
          isFlipped: false,
          isMatched: false,
        };
      });

      const suffledData = fomatData
        .concat(cloneData)
        .sort(() => Math.random() - 0.5);
      setCards(suffledData);
    }
  }, [data]);

  return (
    <>
      <AnimatePresence mode="wait">
        {gameMode === null ? (
          <motion.div
            key={gameMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Modal>
              <Loading />
            </Modal>
          </motion.div>
        ) : (
          <motion.div
            style={{ width: "100%", height: "100%" }}
            key={gameMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MainGame />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MainGame() {
  const { onClickCard, cards } = useCardGame();
  const gameMode = useStore((state) => state.currentGameMode);

  const [scope, animate] = useAnimate();

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

  // const previousCards = usePrevious(cards);

  useEffect(() => {
    if (gameMode !== null) {
      animate(
        ".card-stagger",
        {
          opacity: [0, 1],
          y: [30, 0],
        },
        {
          duration: 0.2,
          delay: stagger(0.1, { startDelay: 0.15 }),
        }
      );
    }
  }, [gameMode]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container + " g-container"} ref={scope}>
          {cards.map((card, ind) => (
            <motion.div className="card-stagger" key={ind}>
              <Card
                onClickCB={() => {
                  onClickCard(card);
                }}
                active={card.isFlipped || card.isMatched}
                url={card.url}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <Overlay />

      {endGame && (
        <div>
          EndGame
          {gameMode === "single" ? (
            <p>Time: {winner?.time}</p>
          ) : (
            <p>
              Winner: {winner?.player} with score {winner?.score}
            </p>
          )}
        </div>
      )}
    </>
  );
}
