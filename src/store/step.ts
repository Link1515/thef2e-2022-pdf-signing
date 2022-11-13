import create from 'zustand'

interface StepState {
  now: number
  setStep: (step: number) => void
}

export const useStepStore = create<StepState>(set => ({
  now: 0,
  setStep: step => set(() => ({ now: step }))
}))
