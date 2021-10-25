import { useRef, useContext, useEffect } from 'react'
import { useOnScreen } from './useOnScreen'
import { NavContext } from '../Contexts/NewNavContext'

export const useNav = (navLinkId:string) => {
  const ref: any = useRef<HTMLElement>()

	const { setActiveLink } = useContext(NavContext)
	const context = useContext(NavContext)

	const isOnScreen: boolean = useOnScreen(ref)


  console.log('IsOnscreen:', isOnScreen, 'NavLinkId:', navLinkId)
  console.log('Ref:', ref)
  console.log('Context:',context )

  if (isOnScreen) {
    setActiveLink(navLinkId)
  }

	return ref
};
