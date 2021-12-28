import { Fragment, useContext, useEffect, useState } from "react";

import AuthContext from "../store/auth-context";

import { getData } from "../lib/get-data";
import { useRouter } from "next/router";
import SimpleSection from "../components/sections/SimpleSection";
import classes from "../styles/dashboard.module.css";
import ShowPage from "../components/showpage/ShowPage";
import Head from "next/head";

const Index = (props) => {
  const authCtx = useContext(AuthContext);

  const showPage = authCtx.showPage;

  const [pageData, setPageData] = useState();
  const [seo, setSeo] = useState();

  const pageId = props.pageId;

  const router = useRouter();

  const openModal = () => {
    authCtx.openSectionModal();
  };

  useEffect(async () => {
    const dataget = await getData(`getPage/index`);
    setPageData(dataget);
    setSeo(dataget.seo);
  }, []);

  console.log("pageData", pageData);

  const getDataHandler = async () => {
    const dataget = await getData(`getPage/${pageId}`);

    setPageData(dataget.page.sections);
  };

  console.log(seo);

  // const secData = pageData.page.sections;

  return (
    <Fragment>
      {/* {seo && (
        <Head>
          <meta name="description" content={seo.meta_description} />
        </Head>
      )} */}
      <Head>
        <meta
          name="description"
          content={seo ? seo.meta_description : `someeeeeeething`}
        />
      </Head>
      <ShowPage secData={pageData} />
      {/* <SimpleSection /> */}
    </Fragment>
  );
};

export default Index;
