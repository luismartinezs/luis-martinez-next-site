import { HOST_IMG_URL, THUMBNAIL_IMG_URL } from 'constants/index'

function getImgUrl(src: string) {
  return src.startsWith('http') ? src : `${HOST_IMG_URL}/${src}.png`
}

function getThumbnailImgUrl(src: string) {
  return src.startsWith('http') ? src : `${THUMBNAIL_IMG_URL}/${src}.png`
}

export { getImgUrl, getThumbnailImgUrl }