import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Hydrate } from "react-query/hydration"
import { useState } from "react"

import theme from 'styles/theme'
import { GlobalStyle } from 'styles/GlobalStyle'
import { NavProvider } from '@/Contexts/NavContext'
import { BlogPostProvider } from '@/Contexts/BlogPostContext'
import { ToastProvider } from '@/Hooks/Toast'

interface MyAppProps extends AppProps {}


export default function MyApp({Component, pageProps}:MyAppProps){

  const [queryClient] = useState(() => new QueryClient())
  // const ContextProvider = Component.getInitialProps || Component
    return(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme} >
          <NavProvider>
            <ToastProvider>
              <BlogPostProvider>
                <Hydrate state={pageProps.dehydratedState}>
                  <Component { ...pageProps }/>
                </Hydrate>
              </BlogPostProvider>
              <GlobalStyle />
            </ToastProvider>
          </NavProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
