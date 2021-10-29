import { useRef, useContext, createRef } from 'react'
import { useOnScreen } from './useOnScreen'
import { NavContext } from '../Contexts/NavContext'

export const useNav = (navLinkId:string) => {
  const ref: any = useRef<HTMLElement>()
  // const ref: any = createRef<HTMLElement>()

	const { setActiveLink } = useContext(NavContext)

  const isOnScreen: boolean = useOnScreen<HTMLElement>(ref)
  if (isOnScreen) {
    setActiveLink(navLinkId)
    }
	return ref
};
