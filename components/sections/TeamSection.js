import Link from "next/link";
import AliceCarousel, { Classnames } from "react-alice-carousel";
import { SiTwitter, SiInstagram } from "react-icons/si";
import "react-alice-carousel/lib/alice-carousel.css";
import classes from "./teamsection.module.css";
const TeamSection = (props) => {
  console.log("carousel", props.details);
  const boxes = props.details.section_content;
  let urls = [];
  urls = boxes.socials;
  console.log("urls", urls);
  const items = boxes.map((box, index) => (
    <section key={index} className={classes.box} key={box.id}>
      <img
        className={classes.imgteam}
        src={box.image_url}
        width={200}
        height={200}
      />
      <div className={classes.namepost}>
        <h3>{box.name}</h3>
        <h4>{box.post}</h4>
      </div>
      <div className={classes.social}>
        {box.socials.map((social, index) => (
          <div key={index}>
            {social.url.includes("twitter") && (
              <a href={social.url}>
                <SiTwitter className={classes.twitter} />
              </a>
            )}
            {social.url.includes("instagram") && (
              <a href={social.url}>
                <SiInstagram className={classes.instagram} />
              </a>
            )}
          </div>
        ))}
      </div>
      <p>{box.charecter}</p>
    </section>
  ));

  const responsive = {
    0: { items: 1 },
    1024: { items: 5 },
  };
  return (
    <section className={classes.carousel}>
      <h2 className="text-center m-5">{props.details.title}</h2>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        autoPlayInterval={2000}
        autoPlay={true}
        fadeOutAnimation={true}
        mouseTrackingEnabled={true}
        disableButtonsControls={true}
        infinite={true}
      />
    </section>
  );
};

export default TeamSection;
