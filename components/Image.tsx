import NextImage, { ImageProps } from 'next/image'
import Link from 'next/link'

const Image = ({ ...props }: ImageProps) => {
  const { src, alt } = props

  const queryString = new URLSearchParams({
    src: src as string,
    alt,
  }).toString()

  return (
    <figure className="mx-auto w-fit">
      <Link href={`/image?${queryString}`} target="_blank">
        <NextImage className="my-0" {...props} />
      </Link>
      <figcaption className="text-center">{alt}</figcaption>
    </figure>
  )
}

export default Image
