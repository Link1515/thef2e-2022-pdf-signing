import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import * as pdfjsLib from 'pdfjs-dist'

interface BaseFileState {
  pdfDocProxy: pdfjsLib.PDFDocumentProxy | undefined
  canvasEl: HTMLCanvasElement | undefined
  finalData: string | undefined

  setPdfDocProxy: (pdfDocProxy: pdfjsLib.PDFDocumentProxy) => void
  setCanvasEl: (canvasEl: HTMLCanvasElement) => void
  setFinalData: (finalData: string) => void
}

export const useBaseFileStore = create<BaseFileState>(set => ({
  canvasEl: undefined,
  pdfDocProxy: undefined,
  finalData: undefined,

  setPdfDocProxy: pdfDocProxy => set({ pdfDocProxy }),
  setCanvasEl: canvasEl => set({ canvasEl }),
  setFinalData: finalData => set({ finalData })
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('baseFileStore', useBaseFileStore)
}
