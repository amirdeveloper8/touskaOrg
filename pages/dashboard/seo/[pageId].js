import { Fragment, useContext, useEffect, useState } from "react";
import SectionModule from "../../../components/ui/SectionModule";
import AuthContext from "../../../store/auth-context";

import Link from "next/link";

import classes from "../../../styles/allpages.module.css";

import Button from "../../../components/ui/Button";
import { getData } from "../../../lib/get-data";
import UpdateDetails from "../../../components/dashboard/UpdateDetails";

const Seo = (props) => {
  const authCtx = useContext(AuthContext);

  const showPage = authCtx.showPage;

  const [pageData, setPageData] = useState();

  const [title, setTitle] = useState(props.data.page.title);
  const [desc, setDesc] = useState(props.data.page.excerpt);
  const [url, setUrl] = useState(props.data.page.url);

  const [meta, setMeta] = useState(props.data.seo.meta_description);
  const [seoTitle, setSeoTitle] = useState(props.data.seo.title);
  const [keys, setKeys] = useState(props.data.seo.keywords);

  const pageId = props.pageId;

  // useEffect(async () => {
  //   const dataget = await getData(`getPage/${pageId}`);
  //   setTitle(dataget.page.title);
  //   setDesc(dataget.page.excerpt);
  //   setUrl(dataget.page.url);
  //   setPageData(dataget.seo);
  //   if (dataget.seo) {
  //     if (dataget.seo.meta_description) {
  //       setMeta(dataget.seo.meta_description);
  //     } else {
  //       setMeta("");
  //     }

  //     if (dataget.seo.title) {
  //       setSeoTitle(dataget.seo.title);
  //     } else {
  //       setSeoTitle("");
  //     }

  //     if (dataget.seo.keywords) {
  //       setKeys(dataget.seo.keywords);
  //     } else {
  //       setKeys([]);
  //     }
  //   }
  //   if (!dataget.seo) {
  //     setMeta("");
  //     setSeoTitle("");
  //     setKeys([]);
  //   }
  // }, [showPage]);

  console.log(pageData);
  return (
    <section className="dashboard">
      {showPage && (
        <UpdateDetails
          title={title}
          desc={desc}
          meta={meta}
          url={url}
          seoTitle={seoTitle}
          keys={keys}
          data={pageData}
          pageId={pageId}
        />
      )}
    </section>
  );
};

export default Seo;

export const getServerSideProps = async (context) => {
  const { params } = context;

  const pageId = params.pageId;

  const res = await fetch(`http://api.touskaweb.com/api/getPage/${pageId}`);
  const data = await res.json();
  const status = data.status;
  console.log(res);

  if (status === "page not found") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageId,
      data,
      status,
    },
  };
};
