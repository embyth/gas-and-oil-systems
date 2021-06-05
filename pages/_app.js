/* eslint-disable react/jsx-props-no-spreading */
import HeadWithSeo from "../components/head-with-seo/head-with-seo";

const MyApp = ({ Component, pageProps }) => (
  <>
    <HeadWithSeo />
    <Component {...pageProps} />
  </>
);

export default MyApp;
