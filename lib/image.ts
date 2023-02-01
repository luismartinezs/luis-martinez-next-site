import { CLOUD_NAME, HOST_IMG_URL, THUMBNAIL_IMG_URL } from 'constants/index'
import { ImageLoaderProps } from 'next/image';

function getImgUrl(src: string) {
  return src.startsWith('http') ? src : `${HOST_IMG_URL}/${src}.png`
}

function getThumbnailImgUrl(src: string) {
  return src.startsWith('http') ? src : `${THUMBNAIL_IMG_URL}/${src}.png`
}

const normalizeSrc = (src: string) => src[0] === '/' ? src.slice(1) : src

function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${params.join(',')}/${normalizeSrc(src)}`;
}

export { getImgUrl, getThumbnailImgUrl, cloudinaryLoader }