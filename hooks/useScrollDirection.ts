import { useEffect, useRef } from 'react'

type Direction = 'up' | 'down'

export default function useScrollDirection(
  defaultValue: Direction = 'down'
): React.MutableRefObject<Direction> {
  const scrollDirection = useRef<'up' | 'down'>(defaultValue)
  const prevScrollY = useRef(0)

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

  return scrollDirection
}
