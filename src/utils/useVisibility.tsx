import { createRef, useEffect, useState } from "react"
import throttle from "lodash.throttle"

/**
 * Check if an element is in viewport

 * @param {number} offset - Number of pixels up to the observable element from the top
 * @param {number} throttleMilliseconds - Throttle observable listener, in ms
 */
export function useVisibility< T extends Element>(
  ref: React.MutableRefObject<T>,
  offset: number = 0,
  throttleMilliseconds: number = 100
): [Boolean, React.RefObject<Element>] {
  const [isVisible, setIsVisible] = useState(false)
  const currentElement = createRef<Element>()

  const onScroll =  throttle(() => {
    if (!currentElement.current) {
      setIsVisible(false)
      return
    }
    const viewHeight = window.innerHeight
    offset = (viewHeight/4)
    // const top = currentElement.current.getBoundingClientRect().top
    // setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight)
    // const top = currentElement.current.getBoundingClientRect()
    // setIsVisible(top && true)
    // const top = ref.current.getBoundingClientRect().top
    // const bottom = ref.current.getBoundingClientRect().bottom
    // setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight || bottom - offset >= 0 && top + offset <= window.innerHeight)
    const rect = currentElement.current.getBoundingClientRect()
    // setIsVisible(rect.top - offset >= window.innerHeight )
    setIsVisible(rect.top >= 200 && rect.top <= window.innerHeight)
    return (
      rect.top + offset >= offset &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
  }, throttleMilliseconds)

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true)
    return () => document.removeEventListener('scroll', onScroll, true);
  }, [isVisible, currentElement])

  return [isVisible, currentElement]
}
