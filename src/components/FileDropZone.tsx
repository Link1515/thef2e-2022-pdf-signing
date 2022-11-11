import { useDropzone } from 'react-dropzone'
import imageUpload from '../assets/images/upload.png'

const FileDropZone = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  // const files = acceptedFiles.map(file => (
  //   <li key={file.name}>
  //     {file.name} - {file.size} bytes
  //   </li>
  // ))

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
            檔案大小10Mb以內，檔案格式為PDF、IMG
          </p>
        </div>
      </div>
    </div>
  )
}

export default FileDropZone
