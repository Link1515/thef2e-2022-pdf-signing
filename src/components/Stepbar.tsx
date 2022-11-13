import { useStepStore } from '../store'
import StepNum from './StepNum'

const stepTitles: string[] = [
  '成功上傳檔案',
  '加入簽名檔',
  '確認檔案',
  '下載檔案'
]

const Stepbar = () => {
  const step = useStepStore()

  return (
    <div className="flex h-20 justify-center gap-2 border-b-2 border-gray md:gap-4">
      {stepTitles.map((title, index) => (
        <div key={index} className="flex items-center">
          <StepNum num={index} />
          <span
            className={`overflow-hidden lg:mr-4 lg:ml-3 lg:w-auto ${
              step.now === index ? 'ml-3 w-auto' : 'w-0'
            }`}
          >
            {title}
          </span>
          {index !== stepTitles.length - 1 ? (
            <div className="h-[2px] bg-gray lg:w-20" />
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default Stepbar
