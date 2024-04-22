'use client'

import clsx from 'clsx'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import '@/css/scrollbar.css'
import useScrollDirection from '@/hooks/useScrollDirection'
import createIntersectionObserver from '@/utils/createIntersectionObserver'

interface TableOfContentsProps {
  toc: Array<{
    value: string
    url: string
    depth: number
  }>
}

const findIndexOfHeading = (toc: TableOfContentsProps['toc'], url: string) => {
  return toc.findIndex((item) => item.url === url)
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState(0)
  const scrollDirection = useScrollDirection('down')

  const paddings = ['ps-4', 'ps-8', 'ps-12', 'ps-16', 'ps-20', 'ps-24']
  const firstLevel = toc.reduce((acc, cur) => (cur.depth < acc ? cur.depth : acc), 5)

  useEffect(() => {
    const observer = createIntersectionObserver((entry) => {
      const index = findIndexOfHeading(toc, `#${entry.target.id}`)

      if (entry.isIntersecting) {
        setActiveId(index)
      } else if (scrollDirection.current === 'up') {
        setActiveId(index - 1)
      }
    })

    const headingElements = toc.map((item) =>
      document.getElementById(item.url.slice(1, item.url.length))
    )

    headingElements.forEach((element) => {
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [toc])

  return (
    <ul className="scrollbar sticky top-0 hidden max-h-[100svh] overflow-y-auto overflow-x-clip py-8 pe-8 text-sm xl:block">
      {toc.map((item, i) => (
        <li
          key={item.url}
          className={clsx('mb-2 text-gray-400 transition-all', paddings[item.depth - firstLevel], {
            ['-translate-x-2 font-bold text-red-500']: activeId === i,
          })}
        >
          <Link href={item.url} replace>
            {item.value}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TableOfContents
