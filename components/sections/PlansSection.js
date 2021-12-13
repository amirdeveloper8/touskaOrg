import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

import classes from "./plans-section.module.css";

const PlansSection = (props) => {
  const data = props.details.section_content;
  const title = props.details.title;
  const subtitle = props.details.subtitle;
  console.log("plans", data);
  return (
    <section className={classes.plans}>
      <div className={classes.plansHead} lg={12}>
        <h2>{title}</h2>
        <h5>{subtitle}</h5>
      </div>
      <div className={classes.boxes}>
        {data.map((item, index) => (
          <div className={classes.box} key={index} lg={6} xs={12}>
            <img
              className="mb-5"
              src={item.image_url}
              width={300}
              height={400}
              alt={item.title.content}
            />
            <div className={classes.content}>
              <h3>{item.title.content}</h3>
              <h4 className="mb-3">{item.title.subtitle}</h4>
              <ul>
                {JSON.parse(item.item.lists).map((list, idx) => (
                  <li key={idx}>{list}</li>
                ))}
              </ul>
              <Button className={classes.planBtn}>
                <Link href={item.button.url}>{item.button.name}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlansSection;
