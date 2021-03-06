/* eslint-disable react/jsx-props-no-spreading */
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { NavigationContextProvider } from "../store/navigation-context";

import HeadWithSeo from "../components/head-with-seo/head-with-seo";

const MyApp = ({ Component, pageProps }) => (
  <>
    <HeadWithSeo />
    <ReactNotification />
    <NavigationContextProvider>
      <Component {...pageProps} />
    </NavigationContextProvider>
  </>
);

export default MyApp;
