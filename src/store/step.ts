import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
interface StepState {
  now: number
  setStep: (step: number) => void
}

export const useStepStore = create<StepState>(set => ({
  now: 0,
  setStep: step => set(() => ({ now: step }))
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('stepStore', useStepStore)
}
