import { useRef, useEffect } from 'react'
import konva from 'konva'
import { Stage, Layer, Image } from 'react-konva'
import { useBaseFileStore, useSignStore } from '../store'
import { handlePdf } from '../utils'
import TransformableImage from './ImageTransformable'

const PdfPreview = () => {
  const stage = useRef<konva.Stage>(null)
  const previewBox = useRef<HTMLDivElement>(null)

  const baseFileStore = useBaseFileStore()
  const signStore = useSignStore()

  useEffect(() => {
    const defineBaseFile = async () => {
      if (!previewBox.current) return

      if (baseFileStore.pdfDocProxy) {
        const baseFilePageProxy = await handlePdf.getPage(
          baseFileStore.pdfDocProxy,
          1
        )

        const canvas = await handlePdf.getCanvas(baseFilePageProxy, {
          containerWidth: previewBox.current.clientWidth - 40,
          containerHeight: window.innerHeight - 180,
          scale: 'fullWidth'
        })
        if (!canvas) return

        baseFileStore.setCanvasEl(canvas.el)
        baseFileStore.setPreviewSize({
          width: canvas.width,
          height: canvas.height
        })
      }
    }

    defineBaseFile()
  }, [])

  return (
    <div
      ref={previewBox}
      className="overflow-auto py-4"
      style={{ height: window.innerHeight - 180 + 'px' }}
    >
      <Stage
        ref={stage}
        width={baseFileStore.previewSize.width}
        height={baseFileStore.previewSize.height}
        className="flex justify-center"
      >
        <Layer>
          <Image image={baseFileStore.canvasEl} />
          {signStore.usingList.map(sign => (
            <TransformableImage
              sign={sign}
              isSelected={signStore.selectedId === sign.id}
              key={sign.id}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default PdfPreview
