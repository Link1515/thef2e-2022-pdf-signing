import { useStepStore } from '../store'
import StepNum from './StepNum'

interface Props {
  stepTitles: string[]
}

const Stepbar = (props: Props) => {
  const { stepTitles } = props
  const step = useStepStore()

  return (
    <div className="flex h-20 justify-center gap-2 border-b-2 border-gray md:gap-4">
      {stepTitles.map((title, index) => (
        <div key={index} className="flex items-center">
          <StepNum num={index} />
          <span
            className={`w-0 overflow-hidden lg:mr-4 ${
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
