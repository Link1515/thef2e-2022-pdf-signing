export const getElementContentSize = ({
  element,
  type
}: {
  element: HTMLElement
  type: 'width' | 'height'
}) => {
  const style = getComputedStyle(element)

  if (type === 'width') {
    const clientWidth = element.clientWidth

    const contentWidth =
      clientWidth -
      parseFloat(style.paddingLeft) -
      parseFloat(style.paddingRight)
    return contentWidth
  } else if (type === 'height') {
    const clientHeight = element.clientHeight

    const contentHeight =
      clientHeight -
      parseFloat(style.paddingTop) -
      parseFloat(style.paddingBottom)
    return contentHeight
  }

  return 0
}
