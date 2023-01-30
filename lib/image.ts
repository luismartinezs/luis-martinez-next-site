import { HOST_IMG_URL } from 'constants/index'

function getImgUrl(src: string) {
  // if src starts with https return src otherwise prepend HOST_IMG_URL
  return src.startsWith('https') ? src : `${HOST_IMG_URL}/${src}`
}

export { getImgUrl }