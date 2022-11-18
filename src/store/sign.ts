import create from 'zustand'
import { persist } from 'zustand/middleware'
import { mountStoreDevtool } from 'simple-zustand-devtools'

interface SignState {
  localList: string[]
  usingList: string[]
  saveToLocal: (sign: string) => void
  removeFromLocal: (index: number) => void
  apply: (sign: string) => void
  remove: (index: number) => void
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
      apply: sign => set(state => ({ usingList: [...state.usingList, sign] })),
      remove: index =>
        set(state => {
          state.usingList.splice(index, 1)
          return { usingList: [...state.usingList] }
        })
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
