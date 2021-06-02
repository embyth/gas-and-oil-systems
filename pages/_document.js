import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="uk">
        <Head />
        <body className="page">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
