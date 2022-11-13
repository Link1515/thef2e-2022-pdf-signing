import { useStepStore } from '../store'

type Props = {
  num: number
}

const StepNum = (props: Props) => {
  const { num } = props
  const step = useStepStore()

  let bgColor = ''
  let borderColor = ''
  let textColor = ''

  switch (true) {
    case num <= step.now:
      bgColor = 'bg-primary'
      borderColor = 'border-primary-selected'
      textColor = 'text-white'
      break

    default:
      bgColor = 'bg-white'
      borderColor = 'border-gray'
      textColor = 'text-gray-dark'
      break
  }

  return (
    <div
      className={`grid h-11 w-11 place-items-center rounded-full border-2 bg-clip-content p-1 font-bold ${bgColor} ${borderColor} ${textColor}`}
    >
      {num + 1}
    </div>
  )
}

export default StepNum
