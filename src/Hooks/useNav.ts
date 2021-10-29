import { useRef, useContext, useEffect } from 'react'
import { useOnScreen } from './useOnScreen'
import { NavContext } from '../Contexts/NavContext'

export const useNav = (navLinkId:string) => {
  const ref: any = useRef<HTMLElement>()

	const { setActiveLink } = useContext(NavContext)

  const isOnScreen: boolean = useOnScreen<HTMLElement>(ref)
  useEffect(() => {
    if (isOnScreen) {
      setActiveLink(navLinkId)
      }
  },[])
	return ref
};
