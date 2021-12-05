import { Fragment } from "react";
import ListAccordion from "./getdata/ListAccordion";
import classes from "./banner.module.css";

const BannerSection = (props) => {
  const data = props.details;
  return (
    <Fragment>
      {data.map((item, index) => (
        <section key={index} className={classes.banner} key={index}>
          <img src={item.image_url} />
          <div className={classes.details}>
            <h2>{item.title}</h2>
            <ListAccordion items={item.subtitle} />
          </div>
        </section>
      ))}
    </Fragment>
  );
};

export default BannerSection;
