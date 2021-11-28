import { Fragment, useContext } from "react";
import AuthContext from "../../store/auth-context";
import MainNavigation from "./MainNavigation";
import Sidebar from "./Sidebar";

import classes from "./layout.module.css";
import { useRouter } from "next/router";

const Layout = (props) => {
  const router = useRouter();
  const pathName = router.asPath.includes("dashboard");
  console.log("url", pathName);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Fragment>
      <MainNavigation />
      {isLoggedIn && pathName && <Sidebar />}
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
