import * as pdfjsLib from 'pdfjs-dist'
import { pathConverter } from './pathConverter'

pdfjsLib.GlobalWorkerOptions.workerSrc = pathConverter('/lib/pdf.worker.min.js')

export const handlePdf = {
  buildPdfDoc: async (base64pdf: string) => {
    const data = atob(base64pdf.replace(/.*base64,/, ''))
    const pdfDoc = await pdfjsLib.getDocument({ data }).promise

    return pdfDoc
  },
  getPage: async (pdfDoc: pdfjsLib.PDFDocumentProxy, page: number) => {
    const pdfPage = await pdfDoc.getPage(page)

    return pdfPage
  },
  getCanvas: (
    pdfPage: pdfjsLib.PDFPageProxy,
    config: {
      containerWidth: number
      containerHeight: number
      scale: 'fullWidth' | 'fullHeight' | number
    }
  ) => {
    const { containerWidth, containerHeight, scale } = config
    const canvas = document.createElement('canvas')
    let viewport: pdfjsLib.PageViewport

    if (typeof scale === 'number') {
      viewport = pdfPage.getViewport({ scale })

      canvas.height = viewport.height
      canvas.width = viewport.width
    } else {
      const viewportBase = pdfPage.getViewport({ scale: 1 })

      if (scale === 'fullWidth') {
        const pdfWidthBase = viewportBase.width
        const currentScale = containerWidth / pdfWidthBase
        viewport = pdfPage.getViewport({ scale: currentScale })

        canvas.height = viewport.height
        canvas.width = viewport.width
      } else if (scale === 'fullHeight') {
        const pdfHeightBase = viewportBase.height
        const currentScale = containerHeight / pdfHeightBase
        viewport = pdfPage.getViewport({ scale: currentScale })

        canvas.height = viewport.height
        canvas.width = viewport.width
      }
    }

    return canvas
  }
}

export const base64pdfToCanvas = async (base64pdf: string) => {
  const data = atob(base64pdf.replace(/.*base64,/, ''))

  const pdfDoc = await pdfjsLib.getDocument({ data }).promise
  const pdfPage = await pdfDoc.getPage(1)

  // get pdf height when scale = 1
  // and use it to calculate current scale
  const viewportBase = pdfPage.getViewport({ scale: 1 })
  const pdfHeightBase = viewportBase.height
  const windowHeight = window.innerHeight
  const currentScale = windowHeight / pdfHeightBase
  const viewport = pdfPage.getViewport({ scale: currentScale })

  const canvas = document.createElement('canvas')
  canvas.height = viewport.height
  canvas.width = viewport.width
  const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D

  await pdfPage.render({
    canvasContext,
    viewport
  }).promise

  return canvas
}
