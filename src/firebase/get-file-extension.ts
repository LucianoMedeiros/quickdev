export const getFileExtension = (data: string) => {
  const isJPG = data.includes('image/jpeg')
  const isPNG = data.includes('image/png')
  const isSVG = data.includes('image/svg+xml')

  return isJPG ? '.jpg' : isPNG ? '.png' : isSVG ? '.svg' : ''
}
