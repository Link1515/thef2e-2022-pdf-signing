import { useRef, useEffect, useState } from 'react'
import konva from 'konva'
import { Stage, Layer, Image } from 'react-konva'
import { useBaseFileStore } from '../store'
import { handlePdf } from '../utils'

const PdfPreview = () => {
  const stage = useRef<konva.Stage>(null)
  const previewBox = useRef<HTMLDivElement>(null)
  const baseFile = useBaseFileStore()
  const [baseFileCanvas, setBaseFileCanvas] = useState<HTMLCanvasElement>()
  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 })

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

        setBaseFileCanvas(canvas.el)
        setPreviewSize({ width: canvas.width, height: canvas.height })
      }
    }

    defineBaseFile()
  }, [])

  return (
    <div ref={previewBox}>
      <Stage
        ref={stage}
        width={previewSize.width}
        height={previewSize.height}
        className="flex justify-center"
      >
        <Layer>
          <Image image={baseFileCanvas} />
        </Layer>
      </Stage>
    </div>
  )
}

export default PdfPreview
