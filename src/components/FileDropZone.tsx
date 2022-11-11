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
    <div className="dropZoneBgDash mx-16 mt-10 cursor-pointer bg-primary p-[2px]">
      <div
        className="relative h-[440px] bg-primary-selected"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="absolute-center flex flex-col items-center">
          <img src={imageUpload} alt="upload" className="mb-8 w-28" />
          <p className="mb-2 text-sm text-dark-gray">將檔案拖曳至這裡，或</p>
          <p className="font-blod mb-4 grid h-12 w-96 place-items-center self-stretch rounded bg-primary text-white">
            選擇檔案
          </p>
          <p className="text-sm font-bold text-primary-hover">
            檔案大小10Mb以內，檔案格式為PDF、IMG
          </p>
        </div>
      </div>
    </div>
  )
}

export default FileDropZone
