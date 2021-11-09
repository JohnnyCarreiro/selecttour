import { BlogPostProvider } from "@/Contexts/BlogPostContext"
import { NavProvider } from "@/Contexts/NavContext"
import React, { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ThemeProvider } from "styled-components"
import { ToastProvider } from "./Toast"

import theme from '@/styles/theme'
import { ReactQueryDevtools } from "react-query/devtools"
import { GlobalStyle } from "@/styles/GlobalStyle"
import { FiltersProvider } from "./useFilters"


export const Contexts: React.FC = ({children}) => {

  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme} >
        <NavProvider>
          <ToastProvider>
            <BlogPostProvider>
              <FiltersProvider>
                {children}
              </FiltersProvider>
            </BlogPostProvider>
            <GlobalStyle />
          </ToastProvider>
        </NavProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )

}
