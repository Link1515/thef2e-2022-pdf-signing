import FileDropZone from '../components/FileDropZone'
import Navbar from '../components/Navbar'
import CardStep from '../components/CardStep'
import imageFileUpload from '../assets/images/steps/file-upload.png'
import imageSigning from '../assets/images/steps/signing.png'
import imageSending from '../assets/images/steps/sending.png'

const UploadFile = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <FileDropZone />
        <h3 className="mt-10 mb-7 text-center text-2xl font-bold text-gray-darker">
          輕鬆幾步驟，完成您的簽署
        </h3>
        <div className="mb-9 grid md:grid-cols-3">
          <CardStep
            index={1}
            title="上傳檔案"
            description="選擇PDF檔或是IMG檔"
            imageUrl={imageFileUpload}
          />
          <CardStep
            index={2}
            title="加入簽名檔"
            description="手寫、輸入或是上傳簽名檔"
            imageUrl={imageSigning}
          />
          <CardStep
            index={3}
            title="下載與傳送"
            description="完成簽署可立即傳送檔案給對方"
            imageUrl={imageSending}
          />
        </div>
      </div>
      <footer className="flex h-12 items-center bg-gray-dark">
        <p className="container text-sm text-white">@ 2022 The F2E 4th</p>
      </footer>
    </>
  )
}

export default UploadFile
