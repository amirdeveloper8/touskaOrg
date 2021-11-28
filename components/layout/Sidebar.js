import { Nav } from "react-bootstrap";
import classes from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <section className={classes.sidebar}>
      <Nav className="flex-column">
        <Nav.Link href="/dashboard/addnewpage">Add New Page</Nav.Link>
        <Nav.Link href="/dashboard/index">Index</Nav.Link>
        <Nav.Link href="/dashboard/info">Info</Nav.Link>
        <Nav.Link href="/dashboard/allpages">All Pages</Nav.Link>
      </Nav>
    </section>
  );
};

export default Sidebar;
