import { AnimatePresence, motion } from "framer-motion";
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
  const cards = useStore((state) => state.cards);
  const { onClickCard, setCards } = useCardGame();

  useEffect(() => {
    setCards(MOCK_CARDS);
  }, []);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container + " g-container"}>
          {cards.map((card) => (
            <Card
              key={card.id}
              onClickCB={() => {
                onClickCard(card);
              }}
              active={card.isFlipped || card.isMatched}
              url={card.url}
            />
          ))}
        </div>
      </div>

      <Overlay />
    </>
  );
}
