import { useRouter } from "next/router";
import { useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import Image from "next/image";
import { ConnectToDB } from "../../lib/connect-to-db";

import classes from "./layout.module.css";

const MainNavigation = () => {
  const details = {
    goods: [
      {
        type: "single",
        title: "صفحه اصلی",
        href: "/",
      },
      {
        type: "multipe",
        title: "خدمات",
        sub: [
          {
            title: "سئو",
            href: "/",
          },
          {
            title: "طراحی سایت",
            href: "/",
          },
          {
            title: "گرافیک",
            href: "/",
          },
        ],
      },
      {
        type: "single",
        title: "وبلاگ",
        href: "/",
      },
      {
        type: "single",
        title: "درباره ما",
        href: "/",
      },
    ],
  };

  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const isLoggedIn = authCtx.isLoggedIn;
  const login_token = authCtx.token;

  const connectDB = ConnectToDB("logout");

  const logoutHandler = async () => {
    authCtx.logout();
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${login_token}`,
    };

    const response = await fetch(connectDB, {
      method: "POST",
      headers: headers,
    });

    router.replace("/auth/login");
  };

  return (
    <Navbar className={`orgnavbar ${classes.menu}`} variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <Image src="/logo/logo.png" width={100} height={70} />
        </Navbar.Brand>
        <Nav className="nav-item-list">
          {details.goods.map((item) =>
            item.type === "single" ? (
              <Nav.Link href={item.href} key={item.title}>
                {item.title}
              </Nav.Link>
            ) : (
              <NavDropdown
                key={item.title}
                title={item.title}
                id="navbarScrollingDropdown"
              >
                {item.sub.map((child) => (
                  <NavDropdown.Item key={child.title} href={child.href}>
                    {child.title}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )
          )}
          {!isLoggedIn && <Nav.Link href="/auth/register">ثبت نام</Nav.Link>}
          {!isLoggedIn && <Nav.Link href="/auth/login">ورود</Nav.Link>}
          {isLoggedIn && (
            <Button variant="outline-danger" size="sm" onClick={logoutHandler}>
              خروج
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
