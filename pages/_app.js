import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import { AuthContextProvider } from "../store/auth-context";
import { useEffect, useState } from "react";
import { getData } from "../lib/get-data";
import { Main } from "next/document";

function MyApp({ Component, pageProps }) {
  const [menuList, setMenuList] = useState();
  const [menuButton, setMenuButton] = useState();
  const [menuLogo, setMenuLogo] = useState();

  const [footerDetails, setFooterDetails] = useState();
  useEffect(async () => {
    // const dataget = await getData("get/header");
    // setMenuList(dataget.header.list_menu);
    // setMenuButton(dataget.header.button);
    // setMenuLogo(dataget.header.logo_url);
    const details = await getData("get/footer");
    setFooterDetails(details);
  }, []);

  return (
    <AuthContextProvider>
      <Layout
        list={menuList}
        btn={menuButton}
        logo={menuLogo}
        footer={footerDetails}
      >
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
