import throttle from "lodash.throttle"
import { useState, useEffect, useRef, MutableRefObject  } from "react"

export function useOnScreen<T extends Element>(currentElement: MutableRefObject<T>, rootMargin: string = "0px"): [boolean, MutableRefObject<T>, string ]{
  // State and setter for storing whether element is visible
  const [elementOnScreen, setElementOnScreen] = useState<string>('')
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const setElementRef =  throttle(() => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Update our state when observer callback fires
          setIntersecting(entry.isIntersecting);
        },
        {
          rootMargin,
        }
      );
      if (currentElement.current) {
        observer.observe(currentElement.current);
        setElementOnScreen(currentElement.current.id);
      }
      return () => {
        observer.unobserve(currentElement.current);
        setElementOnScreen('')
      };
    }, []);// Empty array ensures that effect is only run on mount and unmount
  }, 100)
  return [isIntersecting, currentElement, elementOnScreen ];
}
