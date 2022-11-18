import useImage from 'use-image'
import { Image } from 'react-konva'

const ImageUrl = ({ url }: { url: string }) => {
  const [img] = useImage(url)

  return <Image image={img} />
}

export default ImageUrl
