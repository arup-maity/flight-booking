import create from 'zustand'

interface ModelState {
   open: boolean
   toggleModel: () => void
}

export const useLoginModel = create<ModelState>(set => ({
   open: false,
   toggleModel: () => set((state: any) => ({ open: !state.open })),
}))