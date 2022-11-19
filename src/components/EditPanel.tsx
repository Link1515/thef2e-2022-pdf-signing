import iconPlus from '../assets/images/icons/plus.png'
import { useState, useRef, useEffect } from 'react'
import { useSignStore } from '../store'
import { getElementContentSize } from '../utils'
import ModelSign from './ModelSign'
import ImageUrlPreview from './ImageUrlPreview'

const EditPanel = () => {
  const [showModel, setModelState] = useState(false)
  const editPanel = useRef<HTMLDivElement>(null)
  const [imageUrlPreviewWidth, setImageUrlPreviewWidth] = useState(0)
  const signStore = useSignStore()

  useEffect(() => {
    if (!editPanel.current) return
    setImageUrlPreviewWidth(
      getElementContentSize({ element: editPanel.current, type: 'width' })
    )
  })

  return (
    <div ref={editPanel} className="flex flex-col p-6">
      <button
        onClick={() => setModelState(true)}
        className="flex h-12 w-full items-center justify-center gap-4 rounded border border-gray font-semibold"
      >
        <img src={iconPlus} alt="plus" />
        創建簽名
      </button>
      <div className="mb-auto">
        {signStore.localList.map(signUrl => (
          <ImageUrlPreview
            url={signUrl}
            width={imageUrlPreviewWidth}
            height={150}
            key={signUrl}
          />
        ))}
      </div>
      <footer>
        <button className="h-12 w-full rounded bg-primary font-bold text-white">
          下一步
        </button>
      </footer>

      <ModelSign
        closeModel={() => setModelState(false)}
        showModel={showModel}
      />
    </div>
  )
}

export default EditPanel
