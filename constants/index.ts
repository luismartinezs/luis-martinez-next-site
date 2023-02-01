const HOST = 'https://res.cloudinary.com'
export const CLOUD_NAME = 'dicyllvry'
const ASSET_TYPE = 'image'
const DELIVERY_TYPE = 'upload'
const TRANFORMATIONS = {
  default: 'q_100',
  thumbnail: 'c_thumb,w_500,g_center'
}
const PUBLIC_ID = 'luis-martinez'
const BASE_IMG_URL = `${HOST}/${CLOUD_NAME}/${ASSET_TYPE}/${DELIVERY_TYPE}`

export const HOST_IMG_URL = `/${TRANFORMATIONS.default}/${PUBLIC_ID}`
export const THUMBNAIL_IMG_URL = `/${TRANFORMATIONS.thumbnail}/${PUBLIC_ID}`