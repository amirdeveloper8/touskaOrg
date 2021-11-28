import { Button } from "react-bootstrap";
import Link from "next/link";
import classes from "./portfolio-section.module.css";

const PortfolioSection = (props) => {
  const data = props.details.section_content;
  const title = props.details.title;
  return (
    <section className={classes.portfolio}>
      <h2>{title}</h2>
      <div className={classes.portfolioBoxes}>
        {data.map((item) => (
          <div className={classes.portfolioBox}>
            <h3>{item.title.content}</h3>
            <img src={item.image} />
            <Button>
              <Link href={item.button.url}>{item.button.name}</Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
