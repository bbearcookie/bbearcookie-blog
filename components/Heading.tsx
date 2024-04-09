import Link from 'next/link'
import React from 'react'

interface HeadingProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Heading = ({ as: Comp, children, ...props }: HeadingProps) => {
  const weights = {
    h1: 'font-bold',
    h2: 'font-bold',
    h3: 'font-semibold',
    h4: 'font-semibold',
    h5: 'font-normal',
    h6: 'font-normal',
  }

  return (
    <Comp {...props}>
      <Link
        className={`text-black no-underline hover:text-black hover:underline hover:after:content-['_🔗'] ${weights[Comp]}`}
        href={`#${props.id}`}
      >
        {children?.[1]}
      </Link>
    </Comp>
  )
}

export default Heading
