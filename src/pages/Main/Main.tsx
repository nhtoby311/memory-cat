import { AnimatePresence, motion } from "framer-motion";
import Modal from "../../components/Modal/Modal";
import Loading from "../Loading/Loading";
import { useState } from "react";
import useStore from "../../store/store";

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
  return (
    <div>
      MainGame
      <p>asdasd</p>
    </div>
  );
}
