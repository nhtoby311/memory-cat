import { create } from "zustand";

import { GameState, createGameSlice } from "./slices/gameSlice";

export type StoreState = GameState;

const useStore = create<StoreState>()((...a) => ({
  ...createGameSlice(...a),
}));

export default useStore;
