import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ListAccordion from "./getdata/ListAccordion";
import classes from "./simple.module.css";

const SimpleSection = (props) => {
  const data = props.details;
  console.log("datasimple", data);
  return (
    <Fragment>
      {data.map((item, index) => (
        <section key={index} className={classes.simple} key={item.texts.id}>
          <h2>{item.title}</h2>
          <div className={classes.items}>
            <div className={classes.content}>
              <ListAccordion items={item.texts.content} />
            </div>
            <div className={classes.image}>
              <img src={item.image_url} />
            </div>
          </div>
        </section>
      ))}
    </Fragment>
  );
};

export default SimpleSection;
