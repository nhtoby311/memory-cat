import { useEffect, useState } from "react";
import useStore from "../store/store";

const MOCK_TUTORIAL = [
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

export function useCardGame() {
  const [disabledClick, setDisabledClick] = useState(false);

  const firstCard = useStore((state) => state.firstCard);
  const secondCard = useStore((state) => state.secondCard);

  const cards = useStore((state) => state.cards);

  const setCards = useStore((state) => state.setCards);

  const handleCardClick = useStore((state) => state.handleCardClick);

  const resetCardClicks = useStore((state) => state.resetCardClicks);

  const onClickCard = (card: any) => {
    if (disabledClick) return;
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    setCards(newCards);
    handleCardClick(card);
  };

  //Side effects on every clicks
  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabledClick(true);
      if (firstCard.id === secondCard.id) {
        setDisabledClick(false);
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

  return { onClickCard, setCards };
}

export function useCardTutorial() {
  const [disabledClick, setDisabledClick] = useState(false);

  const firstCard = useStore((state) => state.firstCard);
  const secondCard = useStore((state) => state.secondCard);

  const setFirstCard = useStore((state) => state.setFirstCard);
  const setSecondCard = useStore((state) => state.setSecondCard);

  const cards = useStore((state) => state.tutorialCards);

  const setCards = useStore((state) => state.setTutorialCards);

  // const handleCardClick = useStore((state) => state.handleCardClick);

  const handleCardClick = (card: any) => {
    if (firstCard) {
      setSecondCard(card);
    } else {
      setFirstCard(card);
    }
  };

  const resetCardTutorial = useStore((state) => state.resetCardTutorial);

  const onClickCard = (card: any) => {
    if (disabledClick) return;
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    setCards(newCards);
    handleCardClick(card);
  };

  useEffect(() => {
    setCards(MOCK_TUTORIAL);
  }, []);

  //Side effects on every clicks
  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabledClick(true);
      if (firstCard.id === secondCard.id) {
        setDisabledClick(false);
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
        resetCardTutorial();
      } else {
        setTimeout(() => {
          setDisabledClick(false);
          resetCardTutorial();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  return { onClickCard, setCards, cards };
}
