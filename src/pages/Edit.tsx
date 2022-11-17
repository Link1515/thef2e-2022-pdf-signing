import Stepbar from '../components/Stepbar'
import PdfPreview from '../components/PdfPreview'
import EditPanel from '../components/EditPanel'

const Edit = () => {
  return (
    <>
      <Stepbar />
      <div className="grid grid-cols-[auto_400px]">
        <PdfPreview />
        <EditPanel />
      </div>
    </>
  )
}

export default Edit
