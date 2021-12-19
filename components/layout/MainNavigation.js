import {
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import Image from "next/image";

import Link from "next/link";

import classes from "./layout.module.css";

import { BsPersonCircle } from "react-icons/bs";
import { Fragment, useEffect, useState } from "react";
import { getData } from "../../lib/get-data";

const MainNavigation = (props) => {
  const [menuList, setMenuList] = useState([]);
  const [menuButton, setMenuButton] = useState();
  const [menuLogo, setMenuLogo] = useState();

  // const [list1, setList1] = useState([]);
  // const [list2, setList2] = useState([]);

  let list1 = [];
  let list2 = [];

  useEffect(async () => {
    const dataget = await getData("get/header");
    setMenuList(dataget.header.list_menu);
    setMenuButton(dataget.header.button.url);
    setMenuLogo(dataget.header.logo_url);
  }, []);

  const showDropdownHandler = (event) => {
    const parent = event.target.parentElement;
    parent.setAttribute("class", "nav-item show dropdown");
    console.log(parent);
  };

  for (let i = 0; i < menuList.length / 2; i++) {
    list1[i] = menuList[i];
  }

  for (let i = menuList.length / 2; i < menuList.length; i++) {
    list2[i] = menuList[i];
  }

  console.log("list1", list1);
  console.log("list2", list2);

  return (
    <Fragment>
      {menuList.length > 0 && (
        <Navbar className={`orgnavbar ${classes.menu}`} variant="dark">
          <Col lg={1}></Col>
          <Col className={`${classes.firstMenu} ${classes.menuItems}`} lg={4}>
            {list1.map((item) =>
              item.sub.length === 0 ? (
                <div className={classes.menuItem}>
                  <Link href={item.url}>{item.name}</Link>
                </div>
              ) : (
                <div className={`${classes.menuDropdown} ${classes.menuItem}`}>
                  <a className={classes.dropItem} href={item.url}>
                    {item.name}
                  </a>
                  <ul>
                    {item.sub.map((child, index) => (
                      <li>
                        <Link href={child.url}>{child.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </Col>
          {/* <Col className={classes.menuCol} lg={5}>
            <Nav className="nav-item-list">
              {list1.map((item, index) =>
                item.sub.length === 0 ? (
                  <Nav.Link href={item.url} key={index}>
                    {item.name}
                  </Nav.Link>
                ) : (
                  <NavDropdown
                    key={index}
                    title={item.name}
                    id="navbarScrollingDropdown"
                    className={classes.dropDown}
                    onMouseOver={showDropdownHandler}
                  >
                    {item.sub.map((child, index) => (
                      <NavDropdown.Item
                        key={index}
                        className={classes.dropDownItem}
                        href={child.url}
                      >
                        {child.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                )
              )}
            </Nav>
          </Col> */}
          <Col className={classes.menuCol} lg={2}>
            <Navbar.Brand href="/">
              <img src={menuLogo} />
            </Navbar.Brand>
          </Col>
          <Col className={`${classes.secondMenu} ${classes.menuItems}`} lg={4}>
            {list2.map((item) =>
              item.sub.length === 0 ? (
                <div className={classes.menuItem}>
                  <Link href={item.url}>{item.name}</Link>
                </div>
              ) : (
                <div className={`${classes.menuDropdown} ${classes.menuItem}`}>
                  <a className={classes.dropItem} href={item.url}>
                    {item.name}
                  </a>
                  <ul>
                    {item.sub.map((child, index) => (
                      <li>
                        <Link href={child.url}>{child.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </Col>
          <Col lg={1}></Col>
          {menuButton && (
            <a className={classes.iconBtn} href={menuButton}>
              <BsPersonCircle />
            </a>
          )}
        </Navbar>
      )}
      {menuList.length > 0 && (
        <Navbar className={classes.mobileMenu} bg="light" expand={false}>
          <Container fluid>
            <Navbar.Brand className={classes.logMobile} href="/">
              <img src={menuLogo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
              className={classes.burgerMenu}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  className={classes.logMobile}
                  id="offcanvasNavbarLabel"
                >
                  <img src={menuLogo} />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {menuList.map((item, index) =>
                    item.sub.length === 0 ? (
                      <Nav.Link key={index} href={item.url}>
                        {item.name}
                      </Nav.Link>
                    ) : (
                      <NavDropdown
                        title={item.name}
                        id={`offcanvasNavbarDropdown${index}`}
                        className={classes.dropMobile}
                      >
                        {item.sub.map((child, index) => (
                          <NavDropdown.Item key={index} href={child.url}>
                            {child.name}
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    )
                  )}
                  {menuButton && (
                    <a className={classes.iconBtn} href={menuButton}>
                      <BsPersonCircle />
                    </a>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      )}
    </Fragment>
  );
};

export default MainNavigation;
