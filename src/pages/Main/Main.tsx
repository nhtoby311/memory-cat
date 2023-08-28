import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";
import Modal from "../../components/Modal/Modal";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";
import useStore from "../../store/store";
import Overlay from "./Overlay/Overlay";

import styles from "./Main.module.css";
import Card from "../../components/Card/Card";
import { useCardGame } from "../../hooks/useCardGame";
import { MOCK_CARDS } from "../../store/slices/gameSlice";

export default function Main() {
  const gameMode = useStore((state) => state.currentGameMode);

  return (
    <>
      <AnimatePresence mode="wait">
        {gameMode !== null ? (
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
  const cards = useStore((state) => state.cards);
  const { onClickCard, setCards } = useCardGame();

  const [scope, animate] = useAnimate();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setCards(MOCK_CARDS);
  }, []);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container + " g-container"} ref={scope}>
          {cards.map((card) => (
            <motion.div className="card-stagger">
              <Card
                key={card.id}
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
    </>
  );
}
