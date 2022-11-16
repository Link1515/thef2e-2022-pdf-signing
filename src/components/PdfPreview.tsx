import { useRef, useEffect, useState } from 'react'
import konva from 'konva'
import { Stage, Layer, Image } from 'react-konva'
import { useBaseFileStore } from '../store'
import { handlePdf } from '../utils'

const PdfPreview = () => {
  const stage = useRef<konva.Stage>(null)
  const baseFile = useBaseFileStore()
  const [baseFileCanvas, setBaseFileCanvas] = useState<HTMLCanvasElement>()

  useEffect(() => {
    const defineBaseFile = async () => {
      if (baseFile.pdfDocProxy) {
        const baseFilePageProxy = await handlePdf.getPage(
          baseFile.pdfDocProxy,
          1
        )

        setBaseFileCanvas(
          await handlePdf.getCanvas(baseFilePageProxy, {
            containerWidth: 400,
            containerHeight: 600,
            scale: 'fullWidth'
          })
        )
      }
    }

    defineBaseFile()
  }, [])

  return (
    <Stage ref={stage} width={400} height={600} className="mx-auto">
      <Layer>
        <Image image={baseFileCanvas} />
      </Layer>
    </Stage>
  )
}

export default PdfPreview
