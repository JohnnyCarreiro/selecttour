import { useRef, useContext, useMemo, useEffect, createRef } from 'react'
import { useOnScreen } from './useOnScreen'
import { NavContext } from '../Contexts/NavContext'

export const useNav = (navLinkId:string) => {
  // const ref: any = useRef<HTMLElement>()
  const ref: any = createRef<HTMLElement>()

	const { setActiveLink } = useContext(NavContext)

  const isOnScreen: boolean = useOnScreen<HTMLElement>(ref)
  useEffect(() => {
    if (isOnScreen) {
      setActiveLink(navLinkId)
    }
  },[ref])
	return ref
};
