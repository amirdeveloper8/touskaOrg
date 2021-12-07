import React, { useState } from "react";

import Cookies from "js-cookie";

const AuthContext = React.createContext({
  token: "",
  username: "",
  isLoggedIn: false,
  login: (token, username) => {},
  logout: () => {},
  showPage: true,
  sectionModal: false,
  showPageHandler: () => {},
  closePageHandler: () => {},
  simpleSection: false,
  simpleSectionTrigger: () => {},
  closeSimpleSection: () => {},
  sliderSection: false,
  sliderSectionTrigger: () => {},
  closeSliderSection: () => {},
  serviceBoxesSection: false,
  serviceBoxesSectionTrigger: () => {},
  closeServiceBoxesSection: () => {},
  slideDownSection: false,
  slideDownSectionTrigger: () => {},
  closeSlideDownSection: () => {},
  plansSection: false,
  plansSectionTrigger: () => {},
  closePlansSection: () => {},
  teamsSection: false,
  closeTeamsSection: () => {},
  teamsSectionTrigger: () => {},
  accordionSection: false,
  accordionSectionTrigger: () => {},
  closeAccordionSection: () => {},
  tableSection: false,
  tableSectionTrigger: () => {},
  closeTableSection: () => {},
  portfolioSection: false,
  portfolioSectionTrigger: () => {},
  closePortfolioSection: () => {},
  sampleWorksSection: false,
  sampleWorksSectionTrigger: () => {},
  closesampleWorksSection: () => {},
  contactFormsSection: false,
  contactFormsSectionTrigger: () => {},
  closeContactFormsSection: () => {},
  bannerSection: false,
  bannerSectionTrigger: () => {},
  closeBannerSection: () => {},
  simpleTextSection: false,
  simpleTextSectionTrigger: () => {},
  closeSimpleTextSection: () => {},
  simpleImageSection: false,
  simpleImageSectionTrigger: () => {},
  closeSimpleImageSection: () => {},
  contactUsBoxesSection: false,
  contactUsBoxesSectionTrigger: () => {},
  closeContactUsBoxesSectionSection: () => {},
  openSectionModal: () => {},
  closeSectionModal: () => {},
});

export const AuthContextProvider = (props) => {
  /* login */
  const cookieToken = Cookies.get("token");
  const cookieUser = Cookies.get("username");
  const [token, setToken] = useState(cookieToken);
  const [username, setUsername] = useState(cookieUser);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, username) => {
    setToken(token);
    setUsername(username);
    Cookies.set("token", token);
    Cookies.set("username", username);
  };

  const logoutHandler = () => {
    setToken(null);
    Cookies.remove("token");
    Cookies.remove("username");
  };

  /* sections */

  const [showPage, setShowPage] = useState(true);
  const [sectionModal, setSectionModal] = useState(false);
  const [simpleSection, setSimpleSection] = useState(false);
  const [sliderSection, setSliderSection] = useState(false);
  const [serviceBoxesSection, setServiceBoxesSection] = useState(false);
  const [slideDownSection, setSlideDownSection] = useState(false);
  const [plansSection, setPlansSection] = useState(false);
  const [teamsSection, setTeamsSection] = useState(false);
  const [accordionSection, setAccordionSection] = useState(false);
  const [tableSection, setTableSection] = useState(false);
  const [portfolioSection, setPortfolioSection] = useState(false);
  const [sampleWorksSection, setSampleWorksSection] = useState(false);
  const [contactFormsSection, setContactFormsSection] = useState(false);
  const [bannerSection, setBannerSection] = useState(false);
  const [simpleTextSection, setSimpleTextSection] = useState(false);
  const [simpleImageSection, setSimpleImageSection] = useState(false);
  const [contactUsBoxesSection, setContactUsBoxesSection] = useState(false);

  const simpleSectionTrigger = () => {
    setSimpleSection(true);
    setSectionModal(false);
    setShowPage(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setSlideDownSection(false);
    setPlansSection(false);
    setTeamsSection(false);
    setTableSection(false);
    setPortfolioSection(false);
    setSampleWorksSection(false);
    setContactFormsSection(false);
    setBannerSection(false);
    setSimpleTextSection(false);
    setSimpleImageSection(false);
    setContactUsBoxesSection(false);
  };

  const closeSimpleSection = () => {
    setSimpleSection(false);
  };

  const sliderSectionTrigger = () => {
    setSliderSection(true);
    setSectionModal(false);
    setShowPage(false);
    setSimpleSection(false);
    setServiceBoxesSection(false);
    setSlideDownSection(false);
    setPlansSection(false);
    setTeamsSection(false);
    setTableSection(false);
    setPortfolioSection(false);
    setSampleWorksSection(false);
    setContactFormsSection(false);
    setBannerSection(false);
    setSimpleTextSection(false);
    setSimpleImageSection(false);
    setContactUsBoxesSection(false);
  };

  const closeSliderSection = () => {
    setSliderSection(false);
  };

  const serviceBoxesSectionTrigger = () => {
    setServiceBoxesSection(true);
    setSectionModal(false);
    setShowPage(false);
    setSimpleSection(false);
    setSliderSection(false);
    setSlideDownSection(false);
    setPlansSection(false);
    setTeamsSection(false);
    setTableSection(false);
    setPortfolioSection(false);
    setSampleWorksSection(false);
    setContactFormsSection(false);
    setBannerSection(false);
    setSimpleTextSection(false);
    setSimpleImageSection(false);
    setContactUsBoxesSection(false);
  };

  const closeServiceBoxesSection = () => {
    setServiceBoxesSection(false);
  };

  const slideDownSectionTrigger = () => {
    setSlideDownSection(true);
    setSectionModal(false);
    setShowPage(false);
    setSimpleSection(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setPlansSection(false);
    setTeamsSection(false);
    setTableSection(false);
    setPortfolioSection(false);
    setSampleWorksSection(false);
    setContactFormsSection(false);
    setBannerSection(false);
    setSimpleTextSection(false);
    setSimpleImageSection(false);
    setContactUsBoxesSection(false);
  };

  const closeSlideDownSection = () => {
    setSlideDownSection(false);
  };

  const plansSectionTrigger = () => {
    setPlansSection(true);
    setSimpleSection(false);
    setSlideDownSection(false);
    setSectionModal(false);
    setShowPage(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setTeamsSection(false);
    setTableSection(false);
    setPortfolioSection(false);
    setSampleWorksSection(false);
    setContactFormsSection(false);
    setBannerSection(false);
    setSimpleTextSection(false);
    setSimpleImageSection(false);
    setContactUsBoxesSection(false);
  };

  const closePlansSection = () => {
    setPlansSection(false);
  };

  const teamsSectionTrigger = () => {
    setTeamsSection(true);
    setSimpleSection(false);
    setSlideDownSection(false);
    setSectionModal(false);
    setShowPage(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setPlansSection(false);
    setTableSection(false);
    setPortfolioSection(false);
    setSampleWorksSection(false);
    setContactFormsSection(false);
    setBannerSection(false);
    setSimpleTextSection(false);
    setSimpleImageSection(false);
    setContactUsBoxesSection(false);
  };

  const closeTeamsSection = () => {
    setTeamsSection(false);
  };

  const accordionSectionTrigger = () => {
    setAccordionSection(true);
    setTeamsSection(false);
    setSimpleSection(false);
    setSlideDownSection(false);
    setSectionModal(false);
    setShowPage(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setPlansSection(false);
    setTableSection(false);
    setPortfolioSection(false);
    setSampleWorksSection(false);
    setContactFormsSection(false);
    setBannerSection(false);
    setSimpleTextSection(false);
    setSimpleImageSection(false);
    setContactUsBoxesSection(false);
  };

  const closeAccordionSection = () => {
    setAccordionSection(false);
  };

  const tableSectionTrigger = () => {
    setTableSection(true);
    setAccordionSection(false);
    setTeamsSection(false);
    setSimpleSection(false);
    setSlideDownSection(false);
    setSectionModal(false);
    setShowPage(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setPlansSection(false);
    setPortfolioSection(false);
    setSampleWorksSection(false);
    setContactFormsSection(false);
    setBannerSection(false);
    setSimpleTextSection(false);
    setSimpleImageSection(false);
    setContactUsBoxesSection(false);
  };

  const closeTableSection = () => {
    setTableSection(false);
  };

  const portfolioSectionTrigger = () => {
    setPortfolioSection(true);
    setTableSection(false);
    setAccordionSection(false);
    setTeamsSection(false);
    setSimpleSection(false);
    setSlideDownSection(false);
    setSectionModal(false);
    setShowPage(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setPlansSection(false);
    setSampleWorksSection(false);
    setContactFormsSection(false);
    setBannerSection(false);
    setSimpleTextSection(false);
    setSimpleImageSection(false);
    setContactUsBoxesSection(false);
  };

  const closePortfolioSection = () => {
    setPortfolioSection(false);
  };

  const sampleWorksSectionTrigger = () => {
    setSampleWorksSection(true);
    setPortfolioSection(false);
    setTableSection(false);
    setAccordionSection(false);
    setTeamsSection(false);
    setSimpleSection(false);
    setSlideDownSection(false);
    setSectionModal(false);
    setShowPage(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setPlansSection(false);
    setContactFormsSection(false);
    setBannerSection(false);
    setSimpleTextSection(false);
    setSimpleImageSection(false);
    setContactUsBoxesSection(false);
  };

  const closesampleWorksSection = () => {
    setSampleWorksSection(false);
  };

  const contactFormsSectionTrigger = () => {
    setContactFormsSection(true);
    setSampleWorksSection(false);
    setPortfolioSection(false);
    setTableSection(false);
    setAccordionSection(false);
    setTeamsSection(false);
    setSimpleSection(false);
    setSlideDownSection(false);
    setSectionModal(false);
    setShowPage(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setPlansSection(false);
    setBannerSection(false);
    setSimpleTextSection(false);
    setSimpleImageSection(false);
    setContactUsBoxesSection(false);
  };

  const closeContactFormsSection = () => {
    setContactFormsSection(false);
  };

  const bannerSectionTrigger = () => {
    setBannerSection(true);
    setContactFormsSection(false);
    setSampleWorksSection(false);
    setPortfolioSection(false);
    setTableSection(false);
    setAccordionSection(false);
    setTeamsSection(false);
    setSimpleSection(false);
    setSlideDownSection(false);
    setSectionModal(false);
    setShowPage(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setPlansSection(false);
    setSimpleTextSection(false);
    setSimpleImageSection(false);
    setContactUsBoxesSection(false);
  };

  const closeBannerSection = () => {
    setBannerSection(false);
  };

  const simpleTextSectionTrigger = () => {
    setSimpleTextSection(true);
    setSimpleImageSection(false);
    setBannerSection(false);
    setContactFormsSection(false);
    setSampleWorksSection(false);
    setPortfolioSection(false);
    setTableSection(false);
    setAccordionSection(false);
    setTeamsSection(false);
    setSimpleSection(false);
    setSlideDownSection(false);
    setSectionModal(false);
    setShowPage(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setPlansSection(false);
    setContactUsBoxesSection(false);
  };

  const closeSimpleTextSection = () => {
    setSimpleTextSection(false);
  };

  const simpleImageSectionTrigger = () => {
    setSimpleImageSection(true);
    setSimpleTextSection(false);
    setBannerSection(false);
    setContactFormsSection(false);
    setSampleWorksSection(false);
    setPortfolioSection(false);
    setTableSection(false);
    setAccordionSection(false);
    setTeamsSection(false);
    setSimpleSection(false);
    setSlideDownSection(false);
    setSectionModal(false);
    setShowPage(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setPlansSection(false);
    setContactUsBoxesSection(false);
  };

  const closeSimpleImageSection = () => {
    setSimpleImageSection(false);
  };

  const contactUsBoxesSectionTrigger = () => {
    setContactUsBoxesSection(true);
    setSimpleImageSection(false);
    setSimpleTextSection(false);
    setBannerSection(false);
    setContactFormsSection(false);
    setSampleWorksSection(false);
    setPortfolioSection(false);
    setTableSection(false);
    setAccordionSection(false);
    setTeamsSection(false);
    setSimpleSection(false);
    setSlideDownSection(false);
    setSectionModal(false);
    setShowPage(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setPlansSection(false);
  };

  const closeContactUsBoxesSectionSection = () => {
    setContactUsBoxesSection(false);
  };

  const showPageHandler = () => {
    setShowPage(true);
    setContactUsBoxesSection(false);
    setSimpleImageSection(false);
    setSimpleTextSection(false);
    setBannerSection(false);
    setContactFormsSection(false);
    setSampleWorksSection(false);
    setPortfolioSection(false);
    setTableSection(false);
    setAccordionSection(false);
    setTeamsSection(false);
    setSimpleSection(false);
    setSlideDownSection(false);
    setSectionModal(false);
    setSliderSection(false);
    setServiceBoxesSection(false);
    setPlansSection(false);
  };
  const closePageHandler = () => {
    setShowPage(false);
  };

  const openSectionModal = () => {
    setSectionModal(true);
  };
  const closeSectionModal = () => {
    setSectionModal(false);
  };

  const contextValue = {
    token: token,
    username: username,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    showPage,
    sectionModal,
    showPageHandler,
    closePageHandler,
    simpleSection,
    closeSimpleSection,
    simpleSectionTrigger,
    sliderSection,
    closeSliderSection,
    sliderSectionTrigger,
    serviceBoxesSection,
    closeServiceBoxesSection,
    serviceBoxesSectionTrigger,
    slideDownSection,
    slideDownSectionTrigger,
    closeSlideDownSection,
    plansSection,
    plansSectionTrigger,
    closePlansSection,
    teamsSection,
    closeTeamsSection,
    teamsSectionTrigger,
    accordionSection,
    accordionSectionTrigger,
    closeAccordionSection,
    tableSection,
    tableSectionTrigger,
    closeTableSection,
    portfolioSection,
    portfolioSectionTrigger,
    closePortfolioSection,
    sampleWorksSection,
    sampleWorksSectionTrigger,
    closesampleWorksSection,
    contactFormsSection,
    contactFormsSectionTrigger,
    closeContactFormsSection,
    bannerSection,
    bannerSectionTrigger,
    closeBannerSection,
    simpleTextSection,
    simpleTextSectionTrigger,
    closeSimpleTextSection,
    simpleImageSection,
    simpleImageSectionTrigger,
    closeSimpleImageSection,
    contactUsBoxesSection,
    contactUsBoxesSectionTrigger,
    closeContactUsBoxesSectionSection,
    openSectionModal,
    closeSectionModal,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
