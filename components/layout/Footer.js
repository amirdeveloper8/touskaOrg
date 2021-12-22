import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getData } from "../../lib/get-data";
import classes from "./footer.module.css";

import Link from "next/link";

import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Footer = (props) => {
  const [details, setDetails] = useState();
  useEffect(async () => {
    const dataget = await getData("get/footer");
    setDetails(dataget.footer);
  }, []);
  console.log("footer", details);
  return (
    <section className={classes.footer}>
      {details && (
        <div className={classes.footerRow}>
          <div className={classes.footerColImage}>
            <img src={details.logo_url} className="w-100" />
            <p className={classes.description}>{details.description}</p>
          </div>
          <div className={classes.footerCol} lg={2} md={6}>
            <h2>خدمات</h2>
            <ul>
              {details.links1.map((item, index) => (
                <li key={index}>
                  <Link href={item.url}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.footerCol} lg={2} md={6}>
            <h2>لینک‌های مفید</h2>
            <ul>
              {details.links2.map((item, index) => (
                <li key={index}>
                  <Link href={item.url}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.footerCol} lg={2} md={6}>
            <h2>آدرس شرکت</h2>
            <ul className={classes.address}>
              {details.socials.map((item, index) => (
                <li key={index}>
                  {item.type_id === 6 && (
                    <a href={item.url}>تلفن: {item.name}</a>
                  )}
                  {item.type_id === 13 && (
                    <a href={item.url}>ایمیل: {item.name}</a>
                  )}
                  {item.type_id === 5 && <a href={item.url}>{item.name}</a>}
                </li>
              ))}
            </ul>
            <ul className={classes.socials}>
              {details.socials.map((item, index) => (
                <li
                  className={
                    item.type_id !== 9 &&
                    item.type_id !== 7 &&
                    item.type_id !== 10 &&
                    `d-none`
                  }
                  key={index}
                >
                  {item.type_id === 9 && (
                    <a className={classes.instagram} href={item.url}>
                      <FaInstagram />
                    </a>
                  )}
                  {item.type_id === 7 && (
                    <a className={classes.linkedin} href={item.url}>
                      <FaLinkedinIn />
                    </a>
                  )}
                  {item.type_id === 10 && (
                    <a className={classes.whatsapp} href={item.url}>
                      <FaWhatsapp />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Footer;
