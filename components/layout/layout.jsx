import { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import NavigationContext from "../../store/navigation-context";

import useKeyboardEvent from "../../hooks/useKeyboardEvent";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

import SiteHeader from "../site-header/site-header";
import SiteNavigation from "../site-navigation/site-navigation";
import Container from "../container/container";

const Layout = ({ children, currentCalculation }) => {
  const router = useRouter();

  const { isNavigationOpen, closeNavigation } = useContext(NavigationContext);

  useLockBodyScroll(isNavigationOpen);

  useEffect(() => {
    router.events.on("routeChangeStart", closeNavigation);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", closeNavigation);
    };
  });

  useKeyboardEvent(`Escape`, closeNavigation, isNavigationOpen);

  return (
    <>
      <SiteHeader />
      <SiteNavigation currentCalculation={currentCalculation} />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
