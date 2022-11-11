interface Props {
  index: number
  title: string
  description: string
  imageUrl: string
}

const CardStep = (props: Props) => {
  const { index, title, description, imageUrl } = props

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 grid h-10 w-10 place-items-center rounded-full border-2 border-primary font-bold text-primary">
        {index}
      </div>
      <h4 className="font-bold">{title}</h4>
      <p>{description}</p>
      <img src={imageUrl} alt="stepImg" />
    </div>
  )
}

export default CardStep
