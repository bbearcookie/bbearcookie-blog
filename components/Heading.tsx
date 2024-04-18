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
    <Comp className="w-fit" {...props}>
      <Link
        className={`flex items-center gap-2 text-black no-underline transition-all duration-200 hover:text-link [&>span]:invisible [&>span]:hover:visible ${weights[Comp]}`}
        href={`#${props.id}`}
        replace
      >
        {children?.[1]}
        <span className="relative">
          <svg viewBox="0 0 16 16" height="0.7em" width="0.7em">
            <g strokeWidth="1.2" fill="none" stroke="currentColor">
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"
              ></path>
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"
              ></path>
            </g>
          </svg>
        </span>
      </Link>
    </Comp>
  )
}

export default Heading
