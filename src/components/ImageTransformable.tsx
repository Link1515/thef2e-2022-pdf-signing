import { useRef, useEffect, useState } from 'react'
import konva from 'konva'
import type { KonvaNodeEvents } from 'react-konva'
import { Image, Transformer } from 'react-konva'
import type { Sign } from '../store'
import { useSignStore } from '../store'
import useImage from 'use-image'

interface Props {
  isSelected: boolean
  sign: Sign
}

interface ImageProps {
  x: undefined | number
  y: undefined | number
  width: undefined | number
  height: undefined | number
}

const TransformableImage = (props: Props) => {
  const { isSelected, sign } = props

  const imageRef = useRef<konva.Image>(null)
  const trRef = useRef<konva.Transformer>(null)

  const [imageProps, setImageProps] = useState<ImageProps>({
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined
  })

  const signStore = useSignStore()
  const [img] = useImage(sign.url)

  useEffect(() => {
    if (isSelected) {
      if (!trRef.current || !imageRef.current) return
      // we need to attach transformer manually
      trRef.current.nodes([imageRef.current])

      const layer = trRef.current.getLayer()
      if (!layer) return
      layer.batchDraw()
    }
  }, [isSelected])

  const handleDragEnd: KonvaNodeEvents['onDragEnd'] = e => {
    // update image attribute x and y
    setImageProps({
      ...imageProps,
      x: e.target.x(),
      y: e.target.y()
    })
  }

  const handleTransformEnd: KonvaNodeEvents['onTransformEnd'] = () => {
    /**
     * transformer is changing scale of the node
     * and NOT its width or height
     * but in the store we have only width and height
     * to match the data better we will reset scale on transform end
     */

    const node = imageRef.current
    if (!node) return

    // get the scale after transform
    const scaleX = node.scaleX()
    const scaleY = node.scaleY()

    // reset scale back to 1
    node.scaleX(1)
    node.scaleY(1)

    // update
    setImageProps({
      ...imageProps,
      x: node.x(),
      y: node.y(),
      width: node.width() * scaleX,
      height: node.height() * scaleY
    })
  }

  return (
    <>
      <Image
        image={img}
        {...imageProps}
        ref={imageRef}
        draggable
        onClick={() => signStore.select(sign.id)}
        onTap={() => signStore.select(sign.id)}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}

export default TransformableImage
