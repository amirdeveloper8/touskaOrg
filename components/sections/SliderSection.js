import { Carousel, Col, Row } from "react-bootstrap";
import ListAccordion from "./getdata/ListAccordion";
import classes from "./slider-section.module.css";

const SliderSection = (props) => {
  const data = props.details.section_content;
  return (
    <Carousel className={classes.slide}>
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            src={`/images/BG${index + 1}.jpg`}
            alt={`backgroundslide${index + 1}`}
            className={classes.sliderImg}
          />
          <Carousel.Caption className={classes.sliderSectionItems}>
            {index === 0 && (
              <div className={classes.firstSlide}>
                <h1>{item.title.content}</h1>
                <img src={item.image_url} alt={item.title.content} />
                <div className={classes.firsText}>
                  <ListAccordion items={item.texts.content} />
                </div>
              </div>
            )}

            {index !== 0 && (
              <div className={classes.otherSlides}>
                <h1>{item.title.content}</h1>
                <Row className={classes.contentOther}>
                  <Col lg={5} sm={12}>
                    <div
                      className={classes.lists}
                      style={{
                        backgroundImage: `url(/images/BG${index + 1}.jpg)`,
                      }}
                    >
                      <ListAccordion items={item.texts.content} />
                    </div>
                  </Col>
                  <Col lg={7} md={12}>
                    <img src={item.image_url} alt={item.title.content} />
                  </Col>
                </Row>
              </div>
            )}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SliderSection;
