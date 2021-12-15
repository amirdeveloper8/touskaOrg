import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ListAccordion from "./getdata/ListAccordion";
import Button from "../ui/Button";
import Link from "next/link";

import classes from "./simple.module.css";

const SimpleSection = (props) => {
  const data = props.details;
  const btn = data.button[0];
  // console.log("datasimple", data);
  return (
    <Fragment>
      {data.section_content.map((item, index) => (
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
          {btn.name && (
            <div className="text-center my-3">
              <Button>
                <Link href={btn.url}>{btn.name}</Link>
              </Button>
            </div>
          )}
        </section>
      ))}
    </Fragment>
  );
};

export default SimpleSection;
