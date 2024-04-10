import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...props }: ImageProps) => {
  return (
    <figure>
      <NextImage className="mx-auto" {...props} />
      <figcaption className="text-center">{props.alt}</figcaption>
    </figure>
  )
}

export default Image
