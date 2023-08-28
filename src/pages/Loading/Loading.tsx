import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import styles from "./Loading.module.css";
import useStore from "../../store/store";
import { useCardTutorial } from "../../hooks/useCardGame";

export default function Loading() {
  const [loadingVal, setLoadingVal] = useState(0);

  const loading = useStore((state) => state.currentLoading);
  const setCurrentLoading = useStore((state) => state.setCurrentLoading);

  const setGameMode = useStore((state) => state.setGameMode);

  const { onClickCard, cards } = useCardTutorial();
  useEffect(() => {
    //Increase loading by 20 every 1 second, until it reaches 100
    const interval = setInterval(() => {
      setLoadingVal((prev) => {
        if (prev < 100) return prev + 20;
        return 100;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentLoading(loadingVal);
  }, [loadingVal]);

  return (
    <>
      <div></div>
      <div className={styles.container}>
        <div className={`g-container ${styles["cards-cont"]}`}>
          {cards.map((card, index) => (
            <Card
              key={index}
              onClickCB={() => {
                onClickCard(card);
              }}
              active={card.isFlipped || card.isMatched}
              url={card.url}
            />
          ))}
        </div>
        <div className={`g-container ${styles["descrip-cont"]}`}>
          <p>
            Find and match the same pair of cards, by click to flip the card
            over. Try to find the pair above to continue.
          </p>
        </div>
        <div className={`g-container ${styles["percentage-cont"]}`}>
          {loading === 100 ? (
            <>
              <Button
                onClickCB={() => {
                  setGameMode("single");
                }}
                title="Single Player"
              />
              <Button
                onClickCB={() => {
                  setGameMode("multi");
                }}
                title="Multi Player"
              />
            </>
          ) : (
            <span>{loading}%</span>
          )}
        </div>
      </div>
    </>
  );
}
