import { Fragment, useContext, useEffect, useState } from "react";
import SectionModule from "../../../components/ui/SectionModule";
import AuthContext from "../../../store/auth-context";

import classes from "../../../styles/allpages.module.css";

import Button from "../../../components/ui/Button";
import { getData } from "../../../lib/get-data";
import CreateSimple from "../../../components/sections/create/simple/CreateSimple";
import GetDataPage from "../../../components/sections/getdata/GetDataPage";
import CreateSlider from "../../../components/sections/create/slider/CreateSlider";
import CreateServiceBoxes from "../../../components/sections/create/service-boxes/CreateServiceBoxes";
import CreateSlideDown from "../../../components/sections/create/slide-down/CreateSlideDown";
import CreatePalns from "../../../components/sections/create/plans/CreatePlans";
import CreateTeams from "../../../components/sections/create/teams/CreateTeams";
import CreateAccordion from "../../../components/sections/create/accordion/CreateAccordion";
import TablesForm from "../../../components/sections/create/table/TablesForm";
import CreateTable from "../../../components/sections/create/table/CreateTable";
import { Markup } from "interweave";
import CreatePortfolio from "../../../components/sections/create/Portfolio/CreatePortfolio";
import SampleWorks from "../../../components/sections/create/sample-works/SampleWorks";
import CreateContactForm from "../../../components/sections/create/contact-form/CreateContactForm";

const CreatePage = (props) => {
  const authCtx = useContext(AuthContext);
  const simpleSec = authCtx.simpleSection;
  const sliderSec = authCtx.sliderSection;
  const serviceBoxesSec = authCtx.serviceBoxesSection;
  const slideDownSec = authCtx.slideDownSection;
  const plansSec = authCtx.plansSection;
  const teamsSec = authCtx.teamsSection;
  const accordionSec = authCtx.accordionSection;
  const tableSec = authCtx.tableSection;
  const portfolioSec = authCtx.portfolioSection;
  const sampleWorksSec = authCtx.sampleWorksSection;
  const contactFormsSec = authCtx.contactFormsSection;
  const modalSec = authCtx.sectionModal;
  const showPage = authCtx.showPage;

  const [pageData, setPageData] = useState();

  const pageId = props.pageId;

  const openModal = () => {
    authCtx.openSectionModal();
  };

  useEffect(async () => {
    const dataget = await getData(`getPage/${pageId}`);
    setPageData(dataget);
  }, [showPage]);

  console.log(pageData);

  const getDataHandler = async () => {
    const dataget = await getData(`getPage/${pageId}`);

    setPageData(dataget);

    authCtx.showPageHandler();
  };

  console.log(pageData);
  return (
    <section className="dashboard">
      <div className={classes.buttoncreate}>
        <Button onClick={openModal}>Create New Section</Button>
      </div>
      <div>
        <Button onClick={getDataHandler}>See the latest Sections</Button>
      </div>
      {showPage && <GetDataPage data={pageData} />}
      {modalSec && <SectionModule />}
      {simpleSec && <CreateSimple pageId={pageId} />}
      {sliderSec && <CreateSlider pageId={pageId} />}
      {serviceBoxesSec && <CreateServiceBoxes pageId={pageId} />}
      {slideDownSec && <CreateSlideDown pageId={pageId} />}
      {plansSec && <CreatePalns pageId={pageId} />}
      {teamsSec && <CreateTeams pageId={pageId} />}
      {accordionSec && <CreateAccordion pageId={pageId} />}
      {tableSec && <CreateTable pageId={pageId} />}
      {portfolioSec && <CreatePortfolio pageId={pageId} />}
      {sampleWorksSec && <SampleWorks pageId={pageId} />}
      {contactFormsSec && <CreateContactForm pageId={pageId} />}
    </section>
  );
};

export default CreatePage;

export const getServerSideProps = async (context) => {
  const { params } = context;

  const pageId = params.pageId;

  return {
    props: {
      pageId,
    },
  };
};
