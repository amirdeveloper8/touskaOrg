import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "../../../components/ui/Button";
import { Col, Row } from "react-bootstrap";
import ConnectToDB from "../../../lib/connect-to-db";
import { getData } from "../../../lib/get-data";
import CreateMenu from "../../../components/header/create-menu/CreateMenu";
const Menu = () => {
  const [menuGet, setMenuGet] = useState();
  const [headerGet, setHeaderGet] = useState();
  useEffect(async () => {
    const menuDetails = await getData("get/menus");
    setMenuGet(menuDetails.status);
    const headerDetails = await getData("get/header");
    setHeaderGet(headerDetails.status);
  }, []);
  console.log(menuGet);
  console.log(headerGet);
  return (
    <section className="dashboard">
      <Row>
        <Col className="text-center bg-secondary py-5" lg={5}>
          {menuGet === "not found" && <CreateMenu />}
          {menuGet !== "not found" && (
            <Button>
              <Link href="#">Update Menu</Link>
            </Button>
          )}
        </Col>
        <Col className="text-centerpy-5" lg={2}></Col>
        <Col className="text-center bg-secondary py-5" lg={5}>
          {headerGet === "not found" && (
            <Button>
              <Link href="#">Create Header</Link>
            </Button>
          )}
          {headerGet !== "not found" && (
            <Button>
              <Link href="#">Update Header</Link>
            </Button>
          )}
        </Col>
      </Row>
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
