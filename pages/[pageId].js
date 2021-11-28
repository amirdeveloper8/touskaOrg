import { Fragment, useContext, useEffect, useState } from "react";

import AuthContext from "../store/auth-context";

import { getData } from "../lib/get-data";
import { useRouter } from "next/router";
import SimpleSection from "../components/sections/SimpleSection";
import classes from "../styles/dashboard.module.css";
import ShowPage from "../components/showpage/ShowPage";

const ViewPage = (props) => {
  const authCtx = useContext(AuthContext);

  const showPage = authCtx.showPage;

  const [pageData, setPageData] = useState();

  const pageId = props.pageId;

  const router = useRouter();

  const openModal = () => {
    authCtx.openSectionModal();
  };

  useEffect(async () => {
    const dataget = await getData(`getPage/${pageId}`);
    setPageData(dataget);
  }, []);

  console.log("pageData", pageData);

  const getDataHandler = async () => {
    const dataget = await getData(`getPage/${pageId}`);

    setPageData(dataget.page.sections);
  };

  // const secData = pageData.page.sections;

  return (
    <section>
      <ShowPage secData={pageData} />
      {/* <SimpleSection /> */}
    </section>
  );
};

export default ViewPage;

export const getServerSideProps = async (context) => {
  const { params } = context;

  const pageId = params.pageId;

  return {
    props: {
      pageId,
    },
  };
};
