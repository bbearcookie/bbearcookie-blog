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

const createIntersectionObserver = ({
  onEnter,
  onExit,
}: {
  onEnter?: (entry: IntersectionObserverEntry) => void
  onExit?: (entry: IntersectionObserverEntry) => void
}) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onEnter?.(entry)
        } else {
          onExit?.(entry)
        }
      })
    },
    {
      threshold: 0.5,
    }
  )
}

const findHeadingIndex = (toc: TableOfContentsProps['toc'], url: string) => {
  return toc.findIndex((item) => item.url === url)
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState(0)
  const scrollDirection = useRef<'up' | 'down'>('down')
  const prevScrollY = useRef(0)

  const paddings = ['ps-0', 'ps-4', 'ps-8', 'ps-12', 'ps-16', 'ps-20']
  const firstLevel = toc.reduce((acc, cur) => (cur.depth < acc ? cur.depth : acc), 5)

  useEffect(() => {
    const observer = createIntersectionObserver({
      onEnter: (entry) => {
        if (scrollDirection.current === 'down') {
          setActiveId(findHeadingIndex(toc, `#${entry.target.id}`))
        }
      },
      onExit: (entry) => {
        if (scrollDirection.current === 'up') {
          const prevIndex = findHeadingIndex(toc, `#${entry.target.id}`) - 1
          setActiveId(prevIndex > 0 ? prevIndex : 0)
        }
      },
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > prevScrollY.current) {
        scrollDirection.current = 'down'
      } else {
        scrollDirection.current = 'up'
      }

      prevScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ul className="sticky top-32 pt-4 text-sm">
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
