import { useState } from 'react'
import Navbar from '../components/Navbar'
import PdfPreview from '../components/PdfPreview'
import EditPanel from '../components/EditPanel'

const Edit = () => {
  const [isFinish, setFinishState] = useState(false)

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-[auto_400px]">
        <PdfPreview isFinish={isFinish} />
        <EditPanel
          onGoNext={() => {
            setFinishState(true)
          }}
        />
      </div>
    </>
  )
}

export default Edit
