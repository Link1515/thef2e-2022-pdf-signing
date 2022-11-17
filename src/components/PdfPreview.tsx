import { useRef, useEffect } from 'react'
import konva from 'konva'
import { Stage, Layer, Image } from 'react-konva'
import { useBaseFileStore } from '../store'
import { handlePdf } from '../utils'

const PdfPreview = () => {
  const stage = useRef<konva.Stage>(null)
  const previewBox = useRef<HTMLDivElement>(null)
  const baseFile = useBaseFileStore()

  useEffect(() => {
    const defineBaseFile = async () => {
      if (!previewBox.current) return

      if (baseFile.pdfDocProxy) {
        const baseFilePageProxy = await handlePdf.getPage(
          baseFile.pdfDocProxy,
          1
        )

        const canvas = await handlePdf.getCanvas(baseFilePageProxy, {
          containerWidth: previewBox.current.clientWidth,
          containerHeight: window.innerHeight - 180,
          scale: 'fullHeight'
        })
        if (!canvas) return

        baseFile.setCanvasEl(canvas.el)
        baseFile.setPreviewSize({ width: canvas.width, height: canvas.height })
      }
    }

    defineBaseFile()
  }, [])

  return (
    <div ref={previewBox}>
      <Stage
        ref={stage}
        width={baseFile.previewSize.width}
        height={baseFile.previewSize.height}
        className="flex justify-center"
      >
        <Layer>
          <Image image={baseFile.canvasEl} />
        </Layer>
      </Stage>
    </div>
  )
}

export default PdfPreview
