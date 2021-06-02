import { Fragment } from "react";

import HeadWithSeo from "../components/head-with-seo/head-with-seo";
import Layout from "../components/layout/layout";

const MyApp = ({Component, pageProps}) => (
  <Fragment>
    <HeadWithSeo />
    <Layout currentPage={pageProps.currentCalculation}>
      <Component {...pageProps} />
    </Layout>
  </Fragment>
);

export default MyApp;
