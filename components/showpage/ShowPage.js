import SimpleSection from "../sections/SimpleSection";
import SliderSection from "../sections/SliderSection";
import ServiceBoxesSection from "../sections/ServiceBoxesSection";
import classes from "./showpage.module.css";
import SlideDownSection from "../sections/SlideDownSection";
import PlansSection from "../sections/PlansSection";
import TeamSection from "../sections/TeamSection";
import AccordionSection from "../sections/AccordionSection";
import TableSection from "../sections/TableSection";
import PortfolioSection from "../sections/PortfolioSection";

const ShowPage = (props) => {
  console.log(props.secData);
  const data = props.secData;

  if (!data) {
    return <p>Loading ...</p>;
  }

  if (data.page.sections) {
    const sections = data.page.sections;
    return (
      <div>
        {sections.map((sec, index) => (
          <section
            key={sec.id}
            className={index % 2 ? classes.whiteSec : classes.greenSec}
          >
            {sec.type_id === 1 && (
              <SimpleSection details={sec.section_content} />
            )}
            {sec.type_id === 2 && (
              <SliderSection key={sec.section_content.id} details={sec} />
            )}
            {sec.type_id === 3 && (
              <ServiceBoxesSection key={sec.section_content.id} details={sec} />
            )}
            {sec.type_id === 4 && (
              <SlideDownSection key={sec.section_content.id} details={sec} />
            )}
            {sec.type_id === 5 && (
              <PlansSection key={sec.section_content.id} details={sec} />
            )}
            {sec.type_id === 6 && (
              <TeamSection key={sec.section_content.id} details={sec} />
            )}
            {sec.type_id === 7 && (
              <AccordionSection key={sec.section_content.id} details={sec} />
            )}
            {sec.type_id === 8 && (
              <TableSection key={sec.section_content.id} details={sec} />
            )}
            {sec.type_id === 9 && (
              <PortfolioSection key={sec.section_content.id} details={sec} />
            )}
          </section>
        ))}
      </div>
    );
  }
};

export default ShowPage;
