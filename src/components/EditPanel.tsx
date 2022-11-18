import { useState } from 'react'
import iconPlus from '../assets/images/icons/plus.png'
import ModelSign from './ModelSign'

const EditPanel = () => {
  const [showModel, setModelState] = useState(false)

  return (
    <div className="flex flex-col p-6">
      <div className="mb-auto">
        <button
          onClick={() => setModelState(true)}
          className="flex h-12 w-full items-center justify-center gap-4 rounded border border-gray font-semibold"
        >
          <img src={iconPlus} alt="plus" />
          創建簽名
        </button>
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
