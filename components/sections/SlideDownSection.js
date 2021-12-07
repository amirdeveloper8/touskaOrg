import { Col, Container, Row } from "react-bootstrap";
import classes from "./slidedown-section.module.css";

const SlideDownSection = (props) => {
  const data = props.details.section_content;
  const title = props.details.title;
  console.log(data);
  return (
    <Container className="py-5">
      <h2 className="text-center py-3">{title}</h2>
      <section className={classes.boxes}>
        {data.map((item, index) => (
          <Col key={index} className={classes.box} lg={4} md={6} xs={12}>
            <div className={classes.show}>
              <h3>{item.title.content}</h3>
            </div>
            <div className={classes.hover}>
              <p>{item.texts.content}</p>
            </div>
          </Col>
        ))}
      </section>
    </Container>
  );
};

export default SlideDownSection;
