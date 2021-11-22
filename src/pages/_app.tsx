import React from 'react'
import { AppProps } from 'next/app'

import { QueryClient } from "react-query"
import { Hydrate } from "react-query/hydration"
import { useState } from "react"

import { Contexts } from '@/Contexts/Contexts'

interface MyAppProps extends AppProps {}


export default function MyApp({Component, pageProps}:MyAppProps){

  const [queryClient] = useState(() => new QueryClient())
  // const ContextProvider = Component.getInitialProps || Component
    return(
      <Contexts>
        <Hydrate state={pageProps.dehydratedState}>
          <Component { ...pageProps }/>
        </Hydrate>
      </Contexts>
    )
}
