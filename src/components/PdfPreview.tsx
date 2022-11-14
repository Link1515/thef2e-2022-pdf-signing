import { useRef } from 'react'
import konva from 'konva'
import { Stage, Layer, Image } from 'react-konva'
import { useBaseFileStore } from '../store'

const PdfPreview = () => {
  const stage = useRef<konva.Stage>(null)
  const baseFile = useBaseFileStore()

  return (
    <Stage
      ref={stage}
      width={baseFile.previewSize.width}
      height={baseFile.previewSize.height}
      className="mx-auto"
    >
      <Layer>
        <Image image={baseFile.canvasEl} />
      </Layer>
    </Stage>
  )
}

export default PdfPreview
