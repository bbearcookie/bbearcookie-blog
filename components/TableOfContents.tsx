'use client'

import clsx from 'clsx'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

interface TableOfContentsProps {
  toc: Array<{
    value: string
    url: string
    depth: number
  }>
}

const parseHref = (url: string) => {
  return Number(url.split('-').at(-1)) ? url.split('-').slice(0, -1).join('-') : url
}

const createIntersectionObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry)
      }
    })
  })
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  const paddings = ['ps-0', 'ps-4', 'ps-8', 'ps-12', 'ps-16', 'ps-20']
  const firstLevel = toc.reduce((acc, cur) => (cur.depth < acc ? cur.depth : acc), 5)

  useEffect(() => {
    const observer = createIntersectionObserver((entry) => {
      setActiveId(entry.target.id)
    })

    const headingElements = toc.map((item) =>
      document.getElementById(parseHref(item.url.slice(1, item.url.length)))
    )

    headingElements.forEach((element) => {
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [toc])

  return (
    <ul className="sticky top-32 pt-4 text-sm">
      {toc.map((item) => (
        <li
          key={item.url}
          className={clsx('mb-2 text-gray-400 transition-all', paddings[item.depth - firstLevel], {
            ['-translate-x-2 font-bold text-red-500']:
              activeId === parseHref(item.url.slice(1, item.url.length)),
          })}
        >
          <Link href={parseHref(item.url)} replace>
            {item.value}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TableOfContents
