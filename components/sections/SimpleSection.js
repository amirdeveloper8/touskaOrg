import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./simple.module.css";

const SimpleSection = (props) => {
  const data = props.details;
  console.log("datasimple", data);
  return (
    <Fragment>
      {data.map((item, index) => (
        <section key={index} className={classes.simple} key={item.texts.id}>
          <div className={classes.content}>
            <h2>{item.title}</h2>
            <p>{item.texts.content}</p>
          </div>
          <div className={classes.image}>
            <img src={item.image_url} />
          </div>
        </section>
      ))}
    </Fragment>
  );
};

export default SimpleSection;
