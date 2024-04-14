import Image from 'next/image'

interface ImagePageProps {
  searchParams: {
    src: string
    alt: string
  }
}

export default function ImagePage({ searchParams: { src, alt } }: ImagePageProps) {
  return <Image className="max-h-svh object-contain" src={src} alt={alt} quality={100} fill />
}
