import { Carousel } from "react-bootstrap";
import classes from "./slider-section.module.css";

const SliderSection = (props) => {
  const data = props.details.section_content;
  return (
    <Carousel>
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={item.image_url}
            alt={item.title.content}
          />
          <Carousel.Caption className={classes.sliderSectionItems}>
            <h3>{item.title.content}</h3>
            <p>{item.texts.content}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SliderSection;
