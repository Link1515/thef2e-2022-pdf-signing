import create from 'zustand'
import * as pdfjsLib from 'pdfjs-dist'

interface BaseFileState {
  pdfDocProxy: pdfjsLib.PDFDocumentProxy | undefined
  canvasEl: HTMLCanvasElement | undefined
  previewSize: {
    width: number
    height: number
  }
  setPdfDocProxy: (pdfDocProxy: pdfjsLib.PDFDocumentProxy) => void
  setCanvasEl: (canvasEl: HTMLCanvasElement) => void
  setPreviewSize: (previewSize: { width: number; height: number }) => void
}

export const useBaseFileStore = create<BaseFileState>(set => ({
  canvasEl: undefined,
  pdfDocProxy: undefined,
  previewSize: {
    width: 0,
    height: 0
  },
  setPdfDocProxy: pdfDocProxy => set(() => ({ pdfDocProxy })),
  setCanvasEl: canvasEl => set(() => ({ canvasEl })),
  setPreviewSize: ({ width, height }) =>
    set(() => ({ previewSize: { width, height } }))
}))
