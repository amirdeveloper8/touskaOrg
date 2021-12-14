import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Button from "../../../components/ui/Button";
import { CloseButton, Col, Row } from "react-bootstrap";
import ConnectToDB from "../../../lib/connect-to-db";
import { getData } from "../../../lib/get-data";
import CreateMenu from "../../../components/header/create-menu/CreateMenu";

import classes from "../../../styles/dashboard.module.css";
import CreateHeader from "../../../components/header/create-header/CreateHeader";
import AuthContext from "../../../store/auth-context";
const Menu = () => {
  const [menuGet, setMenuGet] = useState();
  const [headerGet, setHeaderGet] = useState();
  const [createMenu, setCreateMenu] = useState(false);
  const [createHeader, setCreateHeader] = useState();

  const authCtx = useContext(AuthContext);

  const showPage = authCtx.showPage;

  useEffect(async () => {
    const menuDetails = await getData("get/menus");
    setMenuGet(menuDetails.status);
    const headerDetails = await getData("get/header");
    setHeaderGet(headerDetails.status);
  }, [showPage]);
  console.log("menu", menuGet);
  console.log("header", headerGet);

  return (
    <section className="dashboard py-4">
      {showPage && (
        <Row className={classes.headerItems}>
          <Col className={classes.headerItem} lg={12}>
            {menuGet === "not found" && (
              <div>
                {!createMenu && (
                  <Button
                    className={classes.openItemMenu}
                    onClick={() => setCreateMenu(true)}
                  >
                    Create Menu
                  </Button>
                )}
                {createMenu && <CreateMenu />}
              </div>
            )}
            {menuGet !== "not found" && (
              <Button
                className={classes.openItemMenu}
                onClick={() => setCreateMenu(true)}
              >
                Update Menu
              </Button>
            )}
            {createMenu && (
              <CloseButton
                className={classes.closeMenu}
                onClick={() => setCreateMenu(false)}
              />
            )}
          </Col>

          <Col className={classes.headerItem} lg={12}>
            {headerGet === "not found" && (
              <div>
                {!createHeader && (
                  <Button
                    className={classes.openItemMenu}
                    onClick={() => setCreateHeader(true)}
                  >
                    Create Header
                  </Button>
                )}
                {createHeader && <CreateHeader />}
              </div>
            )}
            {headerGet !== "not found" && (
              <Button
                className={classes.openItemMenu}
                onClick={() => setCreateHeader(true)}
              >
                Update Header
              </Button>
            )}
            {createHeader && (
              <CloseButton
                className={classes.closeMenu}
                onClick={() => setCreateHeader(false)}
              />
            )}
          </Col>
        </Row>
      )}
    </section>
  );
};

// export async function getStaticProps(context) {
//   const res = await fetch(
//     "http://192.168.7.19/touskaweb.com/public/api/get/menus"
//   );
//   const data = await res.json();

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }

export default Menu;
