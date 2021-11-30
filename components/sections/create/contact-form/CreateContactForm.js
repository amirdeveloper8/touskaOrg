import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Col, Form, Row, Alert } from "react-bootstrap";
import useInput from "../../../../hooks/use-input";
import { ConnectToDB } from "../../../../lib/connect-to-db";
import AuthContext from "../../../../store/auth-context";
import classes from "../create.module.css";
import InputForms from "./InputForms";
import Notification from "../../../ui/notification";
import { getData } from "../../../../lib/get-data";

const isText = (value) => value.trim().length > 0;
const CreateContactForm = (props) => {
  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isText);
  const {
    value: subtitleValue,
    isValid: subtitleIsValid,
    hasError: subtitleHasError,
    valueChangeHandler: subtitleChangeHandler,
    inputBlurHandler: subtitleBlurHandler,
    reset: resetSubtitle,
  } = useInput(isText);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (file) => {
    setSelectedFile(file[0]);
  };

  const [notification, setNotification] = useState();
  const [dataError, setdataError] = useState();

  const [inputs, setInputs] = useState();

  const [slideCount, setSlideCount] = useState(0);
  const [titles, setTitles] = useState([]);
  const [ids, setIds] = useState([]);

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

  useEffect(() => {}, []);

  const authCtx = useContext(AuthContext);

  const login_token = authCtx.token;

  const getTitles = (title) => {
    setTitles([...titles, title]);
  };

  const getIds = (id) => {
    setIds([...ids, id]);
  };

  const getInputsHandler = async () => {
    const dataInput = await getData("get/typeTable/contactForm");
    setInputs(dataInput.page);
  };

  const slideNumberHandleChange = (e) => {
    setSlideCount(e.target.value);

    console.log(slideCount);
    getInputsHandler();
  };

  for (var i = 0; i < slideCount; i++) {
    sliders[i] = (
      <InputForms
        getTitles={getTitles}
        getIds={getIds}
        titles={titles}
        ids={ids}
        slideCount={slideCount}
        slideNumber={i + 1}
        key={i}
        inputs={inputs}
      />
    );
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setNotification("pending");

    console.log("page_id", props.pageId);
    console.log("type_id", 2);
    console.log("title", titleValue);
    console.log("subtitle", subtitleValue);
    console.log("image", selectedFile);
    console.log("count", slideCount);

    for (var i = 0; i < slideCount; i++) {
      console.log(`input_name_${i + 1}`, titles[i]);
      console.log(`input_type_id_${i + 1}`, ids[i]);
    }

    const fData = new FormData();

    fData.append("page_id", props.pageId);
    fData.append("type_id", 11);
    fData.append("title", titleValue);
    fData.append("subtitle", subtitleValue);
    fData.append("image", selectedFile);
    fData.append("count", slideCount);

    for (var i = 0; i < slideCount; i++) {
      fData.append(`input_name_${i + 1}`, titles[i]);
      fData.append(`input_type_id_${i + 1}`, ids[i]);
    }

    const connectDB = ConnectToDB("create/section/contactForm");

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
            authCtx.closeSliderSection();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });

    console.log(fData);
  };

  let formIsValid = false;

  if (titleIsValid && (titles.length && ids.length) === +slideCount) {
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
            <Form.Label>Number of Inputs</Form.Label>
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
            lg={12}
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
                Please enter a valid Title.
              </Alert>
            )}
          </Form.Group>
          <Form.Group
            as={Col}
            lg={12}
            controlId="formGridFName"
            className={classes.formGroup}
          >
            <Form.Label>Subtitle*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Subtitle"
              required
              value={subtitleValue}
              onChange={subtitleChangeHandler}
              onBlur={subtitleBlurHandler}
            />

            {subtitleHasError && (
              <Alert className="mt-1" variant="danger">
                Please enter a valid Subtitle.
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              lg={12}
              name="image"
              id="image"
              type="file"
              onChange={(e) => handleChange(e.target.files)}
              size="sm"
            />
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

export default CreateContactForm;
