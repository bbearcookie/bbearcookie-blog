import { useEffect, useRef } from 'react'
import throttle from '@/utils/throttle'

type Direction = 'up' | 'down'

export default function useScrollDirection(
  defaultValue: Direction = 'down'
): React.MutableRefObject<Direction> {
  const scrollDirection = useRef<'up' | 'down'>(defaultValue)
  const prevScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY

      if (currentScrollY > prevScrollY.current) {
        scrollDirection.current = 'down'
      } else {
        scrollDirection.current = 'up'
      }

      prevScrollY.current = currentScrollY
    }, 200)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollDirection
}
