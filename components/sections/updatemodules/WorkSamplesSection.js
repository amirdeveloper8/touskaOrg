import classes from "./worksamples.module.css";

const WorkSamplesSection = (props) => {
  const data = props.details.section_content;
  const title = props.details.title;
  return (
    <section className={classes.worksamples}>
      <h1>{title}</h1>
      <div className={classes.details}>
        {data.map((item, index) => (
          <div
            style={{ backgroundImage: `url("${item.image_box_url}")` }}
            className={classes.box}
            key={index}
          >
            <h5>{item.title_box}</h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSamplesSection;
