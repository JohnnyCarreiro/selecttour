import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import { GlobalStyle } from 'styles/GlobalStyle'
import { NavProvider } from '@/Contexts/NavContext'
import { BlogPostProvider } from '@/Contexts/BlogPostContext'
import { ToastProvider } from '@/Hooks/Toast'

interface MyAppProps extends AppProps {}


export default function MyApp({Component, pageProps}:MyAppProps){
    return(
        <ThemeProvider theme={theme} >
          <NavProvider>
            <ToastProvider>
              <BlogPostProvider>
                <Component { ...pageProps }/>
              </BlogPostProvider>
              <GlobalStyle />
            </ToastProvider>
          </NavProvider>
        </ThemeProvider>
    )
}
