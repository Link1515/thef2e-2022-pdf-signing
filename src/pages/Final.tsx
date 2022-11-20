import imageFinal from '../assets/images/finish.png'
import { useBaseFileStore } from '../store'
import jsPDF from 'jspdf'

const Final = () => {
  const basefileStore = useBaseFileStore()

  const downloadPdf = () => {
    if (!basefileStore.finalData) return

    const pdf = new jsPDF()
    const width = pdf.internal.pageSize.width
    const height = pdf.internal.pageSize.height
    pdf.addImage(basefileStore.finalData, 'png', 0, 0, width, height)

    pdf.save('download.pdf')
  }

  return (
    <div className="grid h-screen place-items-center bg-primary-selected bg-opacity-20">
      <div className="flex items-center gap-10">
        <div>
          <img src={imageFinal} alt="finish" />
        </div>
        <div>
          <h3 className="mb-10 text-2xl font-bold text-primary">
            恭喜您！檔案已就緒
          </h3>
          <button
            onClick={downloadPdf}
            className="h-12 w-64 rounded bg-primary text-white shadow"
          >
            下載檔案
          </button>
        </div>
      </div>
    </div>
  )
}

export default Final
