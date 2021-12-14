import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Col, Form, Row, Alert } from "react-bootstrap";
import useInput from "../../../../hooks/use-input";
import { ConnectToDB } from "../../../../lib/connect-to-db";
import AuthContext from "../../../../store/auth-context";
import classes from "../create.module.css";
import Notification from "../../../ui/notification";
import ServiceBoxesForm from "./ServiceBoxesForms";

const isText = (value) => value.trim().length > 0;
const CreateServiceBoxes = (props) => {
  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isText);

  const [notification, setNotification] = useState();
  const [dataError, setdataError] = useState();

  const [slideCount, setSlideCount] = useState(1);
  const [titles, setTitles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [btnNames, setBtnNames] = useState([]);
  const [btnUrls, setBtnUrls] = useState([]);
  const [images, setImages] = useState([]);
  let sliders = [];

  useEffect(() => {
    if (notification === "success created" || notification === "error") {
      const timer = setTimeout(() => {
        setNotification(null);
        setdataError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const authCtx = useContext(AuthContext);

  const login_token = authCtx.token;

  const getTitles = (title) => {
    setTitles([...titles, title]);
  };

  const getTexts = (text) => {
    setTexts([...texts, text]);
  };

  const getBtnNames = (name) => {
    setBtnNames([...btnNames, name]);
  };

  const getBtnUrls = (url) => {
    setBtnUrls([...btnUrls, url]);
  };

  const getImages = (image) => {
    setImages([...images, image]);
  };

  const slideNumberHandleChange = (e) => {
    setSlideCount(e.target.value);

    console.log(slideCount);
  };
  for (var i = 0; i < slideCount; i++) {
    sliders[i] = (
      <ServiceBoxesForm
        getTitles={getTitles}
        getTexts={getTexts}
        getImages={getImages}
        titles={titles}
        texts={texts}
        images={images}
        slideCount={slideCount}
        getBtnNames={getBtnNames}
        btnNames={btnNames}
        getBtnUrls={getBtnUrls}
        btnUrls={btnUrls}
        slideNumber={i + 1}
        key={i}
      />
    );
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setNotification("pending");

    console.log("images", images);
    console.log("titles", titles);
    console.log("texts", texts);
    console.log("btnNames", btnNames);
    console.log("btnUrls", btnUrls);
    console.log("count", +slideCount);

    const fData = new FormData();

    for (var i = 0; i < slideCount; i++) {
      fData.append("page_id", props.pageId);
      fData.append("type_id", 3);
      fData.append("title", titleValue);
      fData.append("count", slideCount);
      fData.append(`title_box_${i + 1}`, titles[i]);
      fData.append(`text_box_${i + 1}`, texts[i]);
      fData.append(`button_name_box_${i + 1}`, btnNames[i]);
      fData.append(`button_url_box_${i + 1}`, btnUrls[i]);
      fData.append(`image_box_${i + 1}`, images[i]);
    }

    const connectDB = ConnectToDB("create/section/servicesBoxes");

    const headers = {
      Authorization: `Bearer ${login_token}`,
    };

    axios({
      method: "POST",
      url: connectDB,
      headers: headers,
      data: fData,
    })
      .then((res) => {
        console.log("res", res);
        if (res.data.status === "success created") {
          console.log(res.data);
          setNotification(res.data.status);
          setTimeout(() => {
            authCtx.showPageHandler();
            authCtx.closeServiceBoxesSection();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });

    console.log(fData);
  };

  let formIsValid = false;

  if (
    titleIsValid &&
    (titles.length && images.length && texts.length) === +slideCount
  ) {
    formIsValid = true;
  }

  let notifDetails;

  if (notification === "pending") {
    notifDetails = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (notification === "success created") {
    notifDetails = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (notification === "error") {
    notifDetails = {
      status: "error",
      title: "Error!",
      message: dataError,
    };
  }
  return (
    <div className={classes.sliders}>
      <Form onSubmit={submitHandler}>
        <Row className="mb-3" className={classes.controlFirstForm}>
          <Form.Group
            as={Col}
            lg={12}
            controlId="formGridFName"
            className={classes.formGroup}
          >
            <Form.Label>تعداد سرویس‌ها</Form.Label>
            <Form.Control
              type="number"
              min={1}
              placeholder="slide Number"
              required
              value={slideCount}
              onChange={slideNumberHandleChange}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formGridFName"
            className={classes.formGroup}
          >
            <Form.Label>Title*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              required
              value={titleValue}
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
            />

            {titleHasError && (
              <Alert className="mt-1" variant="danger">
                Please enter a valid Name.
              </Alert>
            )}
          </Form.Group>
        </Row>

        <div className={`${classes.actions} ${classes.submitactions}`}>
          <button disabled={!formIsValid} variant="primary" type="submit">
            Submit
          </button>
        </div>
      </Form>
      <div className={classes.slidesForm}>{sliders}</div>
      {notification && (
        <Notification
          status={notifDetails.status}
          title={notifDetails.title}
          message={notifDetails.message}
        />
      )}
    </div>
  );
};

export default CreateServiceBoxes;
