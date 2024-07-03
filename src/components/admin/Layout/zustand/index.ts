import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface BearState {
   collapsed: boolean
   toggleCollapsed: () => void
}

export const toggleSidebar = create<BearState>()(
   persist(
      (set) => ({
         collapsed: false,
         toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
      }),
      {
         name: 'toggle-sidebar', // name of the item in the storage (must be unique)
         storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      },
   )
)