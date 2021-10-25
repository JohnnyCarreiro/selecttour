import { useRef, useContext } from 'react'
import { useOnScreen } from './useOnScreen'
import { NavContext } from '../Contexts/NavContext'

export const useNav = (navLinkId:string) => {
  const ref: any = useRef<HTMLElement>()

	const { setActiveLink } = useContext(NavContext)
	const context = useContext(NavContext)

	const isOnScreen: boolean = useOnScreen(ref)

  if (isOnScreen) {
    setActiveLink(navLinkId)
  }

	return ref
};
