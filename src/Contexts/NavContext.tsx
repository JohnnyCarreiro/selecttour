import { useOnScreen } from '../Hooks/useOnScreen'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'


interface IContextProps{
  activeNavLinkId: string
  // setActiveNavLinkId(value:string): void
  // setActiveNavLinkId(): React.Dispatch<React.SetStateAction<string>>
  addActiveLink(linkId: string): void
  // useNav: (navLinkId: string) => any
  useNavContex(navLinkId: string): void
}

export const NavContext = createContext<IContextProps>({} as IContextProps)

const NavProvider:React.FC = ({ children }) => {
	const [activeNavLinkId, setActiveNavLinkId] = useState<string>('')
  const addActiveLink = useCallback((linkId: string)=>{
    setActiveNavLinkId(linkId)
  },[])


	const providerValue = {
		activeNavLinkId,
    addActiveLink,
    useNavContex
	}

	return (
		<NavContext.Provider value={providerValue}>{children}</NavContext.Provider>
	)

}
// function useNav(): IContextProps{
//   const context = useContext(NavContext)

//   if(! context){
//     throw new Error('useToast must be used within an AuthProvider')
//   }
//   return context
// }
// const useNav = (navLinkId:string) => {
//   const ref: any = useRef<HTMLDivElement>()

// 	// const { addActiveLink } = useContext(NavContext)
// 	// const context = useContext(NavContext)

// 	const isOnScreen = useOnScreen(ref)
//   console.log('Ref:', ref)
//   console.log('ID:', navLinkId)

// 	useEffect(() => {

// 		// if (isOnScreen) {
// 		// 	addActiveLink(navLinkId)
// 		// }
// 	}, [isOnScreen, activeNavLinkId, navLinkId])

// 	return ref
// };
const useNavContex = (navLinkId:string) => {
  const ref: any = useRef<HTMLDivElement>()

  // const { addActiveLink } = useContext(NavContext)
  const context = useContext(NavContext)

  const isOnScreen = useOnScreen(ref)
  console.log('Ref:', ref)
  console.log('ID:', navLinkId)

  if(!context ){
    throw new Error('DEu Ruim')
  }
  // useEffect(() => {
  //   if (isOnScreen) {
  //     addActiveLink(navLinkId)
  //   }
  // }, [isOnScreen, activeNavLinkId, navLinkId])

  return context
}

export { NavProvider, useNavContex }
