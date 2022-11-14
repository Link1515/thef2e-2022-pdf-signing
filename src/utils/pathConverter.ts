export const pathConverter = (path: string) => {
  if (import.meta.env.MODE === 'production') {
    return '/thef2e-2022-pdf-signing' + path
  }
  return path
}
