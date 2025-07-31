import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("app-theme") || "sunset",
  setTheme: (theme) => {
    localStorage.setItem("app-theme", theme);
    set({ theme });
  },
}));
