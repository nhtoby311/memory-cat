import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import styles from "./Loading.module.css";
import useStore from "../../store/store";

const MOCK_CARDS = [
  {
    id: 1,
    url: "https://picsum.photos/id/1/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 2,
    url: "https://picsum.photos/id/2/200/300",
    isFlipped: false,
    isMatched: false,
  },

  {
    id: 3,
    url: "https://picsum.photos/id/1/200/300",
    isFlipped: false,
    isMatched: false,
  },
];

export default function Loading() {
  const [loadingVal, setLoadingVal] = useState(0);
  const [disabledClick, setDisabledClick] = useState(false);

  const loading = useStore((state) => state.currentLoading);
  const setCurrentLoading = useStore((state) => state.setCurrentLoading);

  const setGameMode = useStore((state) => state.setGameMode);

  const cards = useStore((state) => state.cards);

  const setCards = useStore((state) => state.setCards);

  const handleCardClick = useStore((state) => state.handleCardClick);

  const firstCard = useStore((state) => state.firstCard);
  const secondCard = useStore((state) => state.secondCard);

  const gameMode = useStore((state) => state.currentGameMode);

  const resetCardClicks = useStore((state) => state.resetCardClicks);

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

  //Set Tutorial decks
  useEffect(() => {
    setCards(MOCK_CARDS);
  }, []);

  //Side effects on every clicks
  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabledClick(true);
      if (firstCard.id === secondCard.id) {
        return;
      }
      if (firstCard.url === secondCard.url) {
        const newCards = cards.map((card) => {
          if (card.url === firstCard.url) {
            return { ...card, isMatched: true };
          }
          return card;
        });
        setCards(newCards);
        setDisabledClick(false);
        resetCardClicks();
      } else {
        setTimeout(() => {
          setDisabledClick(false);
          resetCardClicks();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  return (
    <>
      <div></div>
      <div className={styles.container}>
        <div className={`g-container ${styles["cards-cont"]}`}>
          {cards.map((card, index) => (
            <Card
              key={index}
              onClickCB={() => {
                if (disabledClick) return;
                const newCards = cards.map((c) =>
                  c.id === card.id ? { ...c, isFlipped: true } : c
                );

                setCards(newCards);
                handleCardClick(card);
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
