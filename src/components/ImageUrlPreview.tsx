import useImage from 'use-image'
import { Stage, Layer, Image } from 'react-konva'

interface Props {
  url: string
  width: number
  className: string
}

const ImageUrl = (props: Props) => {
  const { url, width, className } = props
  const [img] = useImage(url)

  let ratio = 1
  if (img) {
    ratio = width / img.naturalWidth
  }

  return (
    <Stage
      width={width}
      height={(img?.naturalHeight || 0) * ratio}
      className={className}
    >
      <Layer>
        <Image image={img} scale={{ x: ratio, y: ratio }} />
      </Layer>
    </Stage>
  )
}

export default ImageUrl
