import { createRef, useEffect, useState } from "react"
import throttle from "lodash.throttle"

/**
 * Check if an element is in viewport

 * @param {number} offset - Number of pixels up to the observable element from the top
 * @param {number} throttleMilliseconds - Throttle observable listener, in ms
 */
export function useVisibility<Element extends HTMLElement>(
  offset: number = 0,
  throttleMilliseconds: number = 100
): [Boolean, React.RefObject<Element>] {
  const [isVisible, setIsVisible] = useState(false)
  const currentElement = createRef<Element>()

  const onScroll = throttle(() => {
    if (!currentElement.current) {
      setIsVisible(false)
      return
    }
    // const top = currentElement.current.getBoundingClientRect().top
    // setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight)
    // const top = currentElement.current.getBoundingClientRect()
    // setIsVisible(top && true)
    const top = currentElement.current.getBoundingClientRect().top
    const bottom = currentElement.current.getBoundingClientRect().bottom
    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight || bottom - offset >= 0 && top + offset <= window.innerHeight)
  }, throttleMilliseconds)

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true)
    return () => document.removeEventListener('scroll', onScroll, true);
  }, [isVisible, currentElement])

  return [isVisible, currentElement]
}
