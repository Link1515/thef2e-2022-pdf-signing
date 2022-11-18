import useImage from 'use-image'
import { Stage, Layer, Image } from 'react-konva'

interface Props {
  url: string
  height: number
  width: number
}

const ImageUrl = (props: Props) => {
  const { url, width, height } = props
  const [img] = useImage(url)

  return (
    <Stage width={width} height={height}>
      <Layer>
        {/* TODO modify to dynamic scale */}
        <Image image={img} scale={{ x: 0.8, y: 0.8 }} />
      </Layer>
    </Stage>
  )
}

export default ImageUrl
