import { Container, Row, Col } from "react-bootstrap";

import classes from "./service-boxes-section.module.css";

const ServiceBoxesSection = (props) => {
  const data = props.details.section_content;
  const title = props.details.title;
  console.log("title", title);
  return (
    <section className={classes.servBoxes}>
      <h2>{title}</h2>
      <div className={classes.boxes}>
        {data.map((item, index) => (
          <div key={index} className={classes.box}>
            <img src={item.image_url} alt={item.title.content} />
            <div className={classes.content}>
              <h3>{item.title.content}</h3>
              <p>{item.texts.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceBoxesSection;
