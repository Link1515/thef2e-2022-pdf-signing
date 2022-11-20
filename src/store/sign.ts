import create from 'zustand'
import { persist } from 'zustand/middleware'
import { mountStoreDevtool } from 'simple-zustand-devtools'

interface SignState {
  localList: string[]
  saveToLocal: (sign: string) => void
  removeFromLocal: (index: number) => void

  usingList: string[]
  selectedSign: string
  apply: (sign: string) => void
  remove: (index: number) => void
  select: (sign: string) => void
}

export const useSignStore = create<SignState>()(
  persist(
    set => ({
      localList: [],
      saveToLocal: sign =>
        set(state => ({ localList: [...state.localList, sign] })),
      removeFromLocal: index =>
        set(state => {
          state.localList.splice(index, 1)
          return { localList: [...state.localList] }
        }),

      usingList: [],
      selectedSign: '',
      apply: sign => set(state => ({ usingList: [...state.usingList, sign] })),
      remove: index =>
        set(state => {
          state.usingList.splice(index, 1)
          return { usingList: [...state.usingList] }
        }),
      select: sign => {
        set({ selectedSign: sign })
      }
    }),
    {
      name: 'sign-storage',
      partialize: state => ({ localList: state.localList })
    }
  )
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('signStore', useSignStore)
}
