import { create } from "zustand";
import { StateCreator } from "zustand";
import { StoreState } from "../store";

export type GAMEMODE = "single" | "multi" | null;

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
    url: "https://picsum.photos/id/3/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 4,
    url: "https://picsum.photos/id/4/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 5,
    url: "https://picsum.photos/id/1/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 6,
    url: "https://picsum.photos/id/2/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 7,
    url: "https://picsum.photos/id/3/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 8,
    url: "https://picsum.photos/id/4/200/300",
    isFlipped: false,
    isMatched: false,
  },
];

type Card = {
  id: number;
  url: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export type GameState = {
  currentGameMode: GAMEMODE;
  setGameMode: (gameMode: GAMEMODE) => void;
  currentLoading: number;
  setCurrentLoading: (currentLoading: number) => void;
  cards: Card[];
  setCards: (cards: Card[]) => void;
  firstCard: Card | null;
  setFirstCard: (card: Card) => void;
  secondCard: Card | null;
  setSecondCard: (card: Card) => void;
  handleCardClick: (card: Card) => void;
  resetCardClicks: () => void;
};

export const createGameSlice: StateCreator<StoreState, [], [], GameState> = (
  set,
  get
) => ({
  currentGameMode: null,
  setGameMode: (gameMode: GAMEMODE) => set({ currentGameMode: gameMode }),
  currentLoading: 0,
  setCurrentLoading: (currentLoading: number) => set({ currentLoading }),
  cards: MOCK_CARDS,
  setCards: (cards: Card[]) => set({ cards }),
  firstCard: null,
  setFirstCard: (card: Card) => set({ firstCard: card }),
  secondCard: null,
  setSecondCard: (card: Card) => set({ secondCard: card }),
  handleCardClick: (card: Card) => {
    if (get().firstCard) {
      get().setSecondCard(card);
    } else {
      get().setFirstCard(card);
    }
  },
  resetCardClicks: () => {
    const resetFlippedCards = get().cards.map((card) => ({
      ...card,
      isFlipped: false,
    }));

    set({ firstCard: null, secondCard: null, cards: resetFlippedCards });
  },
});
