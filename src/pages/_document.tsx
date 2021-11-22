import React from 'react'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt-BR" >
        <Head>
          <meta charSet="utf-8" />
          <link rel="preload" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/png" />
          <link rel="icon" href="/assets/images/favicon.png" />
          <meta name="theme-color" content="#673AB6" />
          {/* <style data-href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap" /> */}
          {/* <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap"
          />
          <link
            rel="preload"
            // rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap"
            media="print"
            // onLoad={this.componentDidMount()}
          />
          <noscript>
            <link
              // rel="stylesheet"
              rel="preload"
              href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap"
            />
          </noscript> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
