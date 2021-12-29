import { Button } from "react-bootstrap";
import Link from "next/link";
import classes from "./portfolio-section.module.css";
import Image from "next/image";

const PortfolioSection = (props) => {
  const data = props.details.section_content;
  const title = props.details.title;
  return (
    <section className={classes.portfolio}>
      <h2>{title}</h2>
      <div className={classes.portfolioBoxes}>
        {data.map((item, index) => (
          <div key={index} className={classes.portfolioBox}>
            <h3>{item.title.content}</h3>
            <Image src={item.image} width={400} height={300} />
            <Button>
              <a href={item.button.url}>{item.button.name}</a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
