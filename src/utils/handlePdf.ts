import * as pdfjsLib from 'pdfjs-dist'
import { pathConverter } from './pathConverter'

pdfjsLib.GlobalWorkerOptions.workerSrc = pathConverter('/lib/pdf.worker.min.js')

const renderCanvas = async ({
  pdfPageProxy,
  viewport
}: {
  pdfPageProxy: pdfjsLib.PDFPageProxy
  viewport: pdfjsLib.PageViewport
}) => {
  const canvas = document.createElement('canvas')
  canvas.width = viewport.width
  canvas.height = viewport.height
  const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D

  await pdfPageProxy.render({
    canvasContext,
    viewport
  }).promise

  return { el: canvas, width: viewport.width, height: viewport.height }
}

export const handlePdf = {
  buildPdfDoc: async (base64pdf: string) => {
    const data = atob(base64pdf.replace(/.*base64,/, ''))
    const pdfDocProxy = await pdfjsLib.getDocument({ data }).promise

    return pdfDocProxy
  },
  getPage: async (pdfDocProxy: pdfjsLib.PDFDocumentProxy, page: number) => {
    const pdfPageProxy = await pdfDocProxy.getPage(page)

    return pdfPageProxy
  },
  getCanvas: async (
    pdfPageProxy: pdfjsLib.PDFPageProxy,
    config: {
      containerWidth: number
      containerHeight: number
      scale: 'fullWidth' | 'fullHeight' | number
    }
  ) => {
    const { containerWidth, containerHeight, scale } = config

    let viewport: pdfjsLib.PageViewport

    if (typeof scale === 'number') {
      viewport = pdfPageProxy.getViewport({ scale })
      return await renderCanvas({
        pdfPageProxy,
        viewport
      })
    } else {
      const viewportBase = pdfPageProxy.getViewport({ scale: 1 })

      if (scale === 'fullWidth') {
        const pdfWidthBase = viewportBase.width
        const currentScale = containerWidth / pdfWidthBase
        viewport = pdfPageProxy.getViewport({ scale: currentScale })

        return await renderCanvas({
          pdfPageProxy,
          viewport
        })
      } else if (scale === 'fullHeight') {
        const pdfHeightBase = viewportBase.height
        const currentScale = containerHeight / pdfHeightBase
        viewport = pdfPageProxy.getViewport({ scale: currentScale })

        return await renderCanvas({
          pdfPageProxy,
          viewport
        })
      }
    }
  }
}
