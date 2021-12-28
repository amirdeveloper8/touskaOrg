import { Fragment } from "react";
import ListAccordion from "./getdata/ListAccordion";
import classes from "./banner.module.css";

const BannerSection = (props) => {
  const data = props.details;
  return (
    <Fragment>
      {data.map((item, index) => (
        <section
          style={{
            backgroundImage: `url(/images/BG1.jpg)`,
          }}
          key={index}
          className={classes.banner}
          key={index}
        >
          <h1>{item.title}</h1>
          <div className={classes.content}>
            {item.image_url && (
              <div className={classes.imgSec}>
                <img src={item.image_url} />
              </div>
            )}
            {item.subtitle && (
              <div className={classes.details}>
                <ListAccordion items={item.subtitle} />
              </div>
            )}
          </div>
        </section>
      ))}
    </Fragment>
  );
};

export default BannerSection;
