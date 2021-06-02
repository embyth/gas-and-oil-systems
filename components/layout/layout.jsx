import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";

import useKeyboardEvent from "../../hooks/useKeyboardEvent";

import SiteHeader from "../site-header/site-header";
import SiteNavigation from "../site-navigation/site-navigation";
import Container from "../container/container";

const Layout = ({ children, currentPage }) => {
  const router = useRouter();

  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsNavigationOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useKeyboardEvent(
    `Escape`,
    () => {
      setIsNavigationOpen(false);
      console.log(`asd`);
    },
    isNavigationOpen
  );

  const closeNavigationHandler = () => {
    setIsNavigationOpen(false);
  };

  const openNavigationHandler = () => {
    setIsNavigationOpen(true);
  };

  return (
    <Fragment>
      <SiteHeader
        currentPage={currentPage}
        onNavigationOpenClick={openNavigationHandler}
      />
      <SiteNavigation
        currentPage={currentPage}
        isNavigationOpen={isNavigationOpen}
        onNavigationCloseClick={closeNavigationHandler}
      />
      <Container>{children}</Container>
    </Fragment>
  );
};

export default Layout;
