import { StateCreator } from "zustand";
import { StoreState } from "../store";

export type SettingsState = {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
};

export const createSettingsSlice: StateCreator<
  StoreState,
  [],
  [],
  SettingsState
> = (set, get) => ({
  currentTheme: "dark",
  setCurrentTheme: (theme: string) => set({ currentTheme: theme }),
  menuOpen: false,
  setMenuOpen: (menuOpen: boolean) => set({ menuOpen: menuOpen }),
});
