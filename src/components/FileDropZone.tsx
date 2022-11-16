import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import imageUpload from '../assets/images/upload.png'
import { useBaseFileStore } from '../store'
import { fileTobase64, handlePdf } from '../utils'

const FileDropZone = () => {
  const navigate = useNavigate()
  const baseFile = useBaseFileStore()

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      const fileUrl = await fileTobase64(file)
      const pdfDocProxy = await handlePdf.buildPdfDoc(fileUrl)

      baseFile.setPdfDocProxy(pdfDocProxy)

      navigate('/edit')
    }
  }

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  })

  let fileRejectionFirstErr: string | null = null
  if (fileRejections.length > 0) {
    fileRejectionFirstErr = fileRejections[0].errors[0].message
  }

  return (
    <div className="dropZoneBgDash mt-10 cursor-pointer bg-primary p-[2px]">
      <div
        className="relative h-[440px] bg-primary-selected"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="absolute-center flex w-full flex-col items-center">
          <img src={imageUpload} alt="upload" className="mb-8 w-28" />
          <p className="mb-2 text-sm text-gray-dark">將檔案拖曳至這裡，或</p>
          <p className="font-blod mb-4 grid h-12 w-36 place-items-center rounded bg-primary text-white lg:w-96">
            選擇檔案
          </p>
          <p className="px-4 text-sm font-bold text-primary-hover">
            檔案大小10Mb以內，檔案格式為PDF
          </p>
          <p className="px-4 text-xl font-bold text-red-600">
            {fileRejectionFirstErr}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FileDropZone
