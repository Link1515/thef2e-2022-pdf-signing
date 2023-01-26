import { useState } from 'react'
import Navbar from '../components/Navbar'
import PdfPreview from '../components/PdfPreview'
import EditPanel from '../components/EditPanel'
import { useSignStore } from '../store'

const Edit = () => {
  const [isFinish, setFinishState] = useState(false)
  const signStore = useSignStore()

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-[auto_400px]">
        <PdfPreview isFinish={isFinish} />
        <EditPanel
          onGoNext={() => {
            signStore.select('')
            setFinishState(true)
          }}
        />
      </div>
    </>
  )
}

export default Edit
