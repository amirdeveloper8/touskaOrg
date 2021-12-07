import { Fragment, useState } from "react";

import ListAccordion from "./getdata/ListAccordion";
import classes from "./simple-textimage.module.css";

import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";

import Modal from "../ui/Modal";

const SimpleTxtImg = (props) => {
  const data = props.details;
  const [fullscreen, setFullscreen] = useState(false);
  const [modalClass, setModalClass] = useState();

  const fullHandler = () => {
    setFullscreen(true);
    setModalClass(`${classes.modalScale}`);
    setTimeout(function () {
      setModalClass(`${classes.modal}`);
    }, 100);
  };

  const exitHandler = () => {
    setTimeout(function () {
      setModalClass(classes.modalScale);
    }, 100);
    setTimeout(function () {
      setFullscreen(false);
    }, 400);
  };
  return (
    <Fragment>
      {data.map((item, index) => (
        <section key={index} className={classes.simple} key={index}>
          <div className={classes.content}>
            <h2>{item.title}</h2>
            <div className={classes.detailsImgTxt}>
              {item.image_url && (
                <div className={classes.imageSimple}>
                  <img src={item.image_url} alt={item.title} />
                  <AiOutlineFullscreen onClick={fullHandler} />
                </div>
              )}
              {item.subtitle && (
                <div className={classes.textSimple}>
                  <ListAccordion items={item.subtitle} />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
      {fullscreen && (
        <Modal className={modalClass}>
          {data.map((item, index) => (
            <div className={classes.modalImage}>
              <img src={item.image_url} alt={item.title} />
              <AiOutlineFullscreenExit onClick={exitHandler} />
            </div>
          ))}
        </Modal>
      )}
    </Fragment>
  );
};

export default SimpleTxtImg;
