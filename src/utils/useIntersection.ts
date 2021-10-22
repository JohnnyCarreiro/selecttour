import throttle  from 'lodash.throttle'
import { createRef, MutableRefObject } from 'react'
import { useState, useEffect } from 'react'

export function useIntersection<Element extends HTMLElement>(element:MutableRefObject<Element>, rootMargin:number): [boolean, React.MutableRefObject<Element>] {
  const [isVisible, setIsVisible] = useState(false)
  const currentElement = createRef<MutableRefObject<Element>>()

  console.log('useIntersection:',element.current)

  // useEffect(() => {
  //     const observer = new IntersectionObserver(
  //         ([entry]) => {
  //             setState(entry.isIntersecting);
  //         }, { rootMargin }
  //     );

  //     element && observer.observe(element.current);

  //     return () => observer.unobserve(element.current);
  // }, []);

  // useEffect(() => {
  //       const observer = new IntersectionObserver(
  //           ([entry]) => {
  //               setIsVisible(entry.isIntersecting);
  //           }, {  }
  //       )
  //       console.log(observer)

  //       // element && observer.observe(element.current);

  //       // return () => observer.unobserve(element.current);
  //   }, []);

  const onScroll =  throttle(() => {
    if (!element.current) {
      setIsVisible(false)
      return
    }
    const top = element.current.getBoundingClientRect().top;
    const bottom = element.current.getBoundingClientRect().bottom
    setIsVisible(top + rootMargin >= 0 && top - rootMargin <= window.innerHeight || bottom - rootMargin >= 0 && top + rootMargin <= window.innerHeight)
  },100)

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true)
    return () => document.removeEventListener('scroll', onScroll, true);
  }, [isVisible, currentElement])

    return [isVisible, element]
};
