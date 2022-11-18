export const getElementContentWidth = (element: HTMLElement) => {
  const clientWidth = element.clientWidth
  const style = getComputedStyle(element)

  const contentWidth =
    clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)

  return contentWidth
}
