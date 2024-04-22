export default function throttle(callback: (...args: unknown[]) => void, delay: number = 0) {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: unknown[]) => {
    if (timer) return

    callback(...args)

    timer = setTimeout(() => {
      timer = null
    }, delay)
  }
}
