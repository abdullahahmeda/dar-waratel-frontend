import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Almarai&family=Markazi+Text&display=swap" rel="stylesheet'
            rel='stylesheet'
          />
        </Head>
        <body dir='rtl'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
