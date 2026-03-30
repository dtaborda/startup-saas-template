import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
}

interface UiActions {
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSidebarMobileOpen: (open: boolean) => void;
}

export type UiStore = UiState & UiActions;

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      sidebarMobileOpen: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setSidebarMobileOpen: (open) => set({ sidebarMobileOpen: open }),
    }),
    {
      name: "ui-store",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
);

export const selectSidebarCollapsed = (state: UiStore) => state.sidebarCollapsed;
export const selectSidebarMobileOpen = (state: UiStore) => state.sidebarMobileOpen;
