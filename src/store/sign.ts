import create from 'zustand'
import { persist } from 'zustand/middleware'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { nanoid } from 'nanoid'
export interface Sign {
  id: string
  url: string
}

interface SignState {
  localList: Sign[]
  saveToLocal: (url: string) => void
  removeFromLocal: (id: string) => void

  usingList: Sign[]
  selectedId: string
  apply: (sign: Sign) => void
  remove: (id: string) => void
  select: (id: string) => void
}

export const useSignStore = create<SignState>()(
  persist(
    set => ({
      localList: [],
      saveToLocal: url =>
        set(state => ({
          localList: [...state.localList, { id: nanoid(), url }]
        })),
      removeFromLocal: id =>
        set(state => {
          return {
            localList: [...state.localList.filter(sign => sign.id !== id)]
          }
        }),

      usingList: [],
      selectedId: '',
      apply: sign =>
        set(state => ({
          usingList: [...state.usingList, sign]
        })),
      remove: id =>
        set(state => {
          return {
            usingList: [...state.usingList.filter(sign => sign.id !== id)]
          }
        }),
      select: id => {
        set({ selectedId: id })
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
