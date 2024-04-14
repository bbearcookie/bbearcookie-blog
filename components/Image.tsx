import NextImage, { ImageProps } from 'next/image'
import Link from 'next/link'

const Image = ({ ...props }: ImageProps) => {
  const { src, alt, width, height } = props

  const queryString = new URLSearchParams({
    src: src as string,
    alt,
    width: width?.toString() || '',
    height: height?.toString() || '',
  }).toString()

  return (
    <figure>
      <Link href={`/image?${queryString}`} target="_blank">
        <NextImage className="mx-auto" {...props} />
      </Link>
      <figcaption className="text-center">{alt}</figcaption>
    </figure>
  )
}

export default Image
