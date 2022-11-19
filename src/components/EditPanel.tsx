import iconPlus from '../assets/images/icons/plus.png'
import { useState, useRef, useEffect } from 'react'
import { useSignStore } from '../store'
import { getElementContentSize } from '../utils'
import ModelSign from './ModelSign'
import ImageUrlPreview from './ImageUrlPreview'

const EditPanel = () => {
  const [showModel, setModelState] = useState(false)
  const editPanel = useRef<HTMLDivElement>(null)
  const [signPreviewSize, setSignPreviewSize] = useState({
    width: 0,
    height: 0
  })
  const signStore = useSignStore()

  useEffect(() => {
    if (!editPanel.current) return

    setSignPreviewSize({
      width: getElementContentSize({
        element: editPanel.current,
        type: 'width'
      }),
      height:
        getElementContentSize({
          element: editPanel.current,
          type: 'height'
        }) -
        // button height
        48 * 2 -
        // gap
        8 * 2
    })
  }, [])

  return (
    <div ref={editPanel} className="flex flex-col gap-2 p-6">
      <button
        onClick={() => setModelState(true)}
        className="flex h-12 w-full items-center justify-center gap-4 rounded border border-gray font-semibold"
      >
        <img src={iconPlus} alt="plus" />
        創建簽名
      </button>
      <div
        className="mb-auto overflow-hidden hover:overflow-y-auto"
        style={{ maxHeight: `${signPreviewSize.height}px` }}
      >
        {signStore.localList.map(signUrl => (
          <ImageUrlPreview
            className="mb-2 rounded border border-gray-dark"
            url={signUrl}
            width={signPreviewSize.width}
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
