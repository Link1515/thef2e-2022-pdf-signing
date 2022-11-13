import './App.css'
import Navbar from './components/Navbar'
import UploadFile from './pages/UploadFile'
import Stepbar from './components/Stepbar'

const App = () => {
  return (
    <>
      <Navbar />
      <Stepbar
        stepTitles={['成功上傳檔案', '加入簽名檔', '確認檔案', '下載檔案']}
      />
      <UploadFile />
    </>
  )
}

export default App
