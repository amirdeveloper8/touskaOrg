import classes from "./table-section.module.css";
import { Col, Nav, Row, Tab, Table } from "react-bootstrap";

import { BsCheckSquareFill } from "react-icons/bs";
import { BsFillXSquareFill } from "react-icons/bs";

const TableSection = (props) => {
  const data = props.details.section_content;
  const tabs = data.tab;
  const ths = JSON.parse(data.th);
  const tfs = JSON.parse(data.tf);
  const widthStyle = 100 / ths.length;
  const title = props.details.title;
  return (
    <section className={classes.tableSection}>
      <h2>{title}</h2>
      <Tab.Container id="left-tabs-example" defaultActiveKey="table0">
        <Row>
          <Col className={classes.nav} sm={12}>
            <Nav variant="pills">
              {tabs.map((tab, index) => (
                <Nav.Item key={index}>
                  <Nav.Link
                    className={classes.navItem}
                    eventKey={`table${index}`}
                  >
                    {tab.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col className={classes.thTables} sm={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {ths.map((th, index) => (
                    <th style={{ width: `${widthStyle}%` }} key={index}>
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
            </Table>
          </Col>

          <Col sm={12}>
            <Tab.Content>
              {tabs.map((tab, index) => (
                <Tab.Pane key={index} eventKey={`table${index}`}>
                  <Table striped bordered hover>
                    <tbody>
                      {JSON.parse(tab.tr).map((tr, index) => (
                        <tr key={index}>
                          {tr.map((td, index) => (
                            <td style={{ width: `${widthStyle}%` }} key={index}>
                              {td === "true" && (
                                <BsCheckSquareFill
                                  className={classes.trueIcon}
                                />
                              )}
                              {td === "false" && (
                                <BsFillXSquareFill
                                  className={classes.falseIcon}
                                />
                              )}
                              {td !== "false" && td !== "true" && td}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
          <Col className={classes.thTables} sm={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {tfs.map((tf, index) => (
                    <th style={{ width: `${widthStyle}%` }} key={index}>
                      {tf}
                    </th>
                  ))}
                </tr>
              </thead>
            </Table>
          </Col>
        </Row>
      </Tab.Container>
    </section>
  );
};

export default TableSection;
