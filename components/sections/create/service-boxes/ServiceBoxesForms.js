import classes from "../create.module.css";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { ConnectToDB } from "../../../../lib/connect-to-db";
import useInput from "../../../../hooks/use-input";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../store/auth-context";
import Notification from "../../../ui/notification";

const isText = (value) => value.trim().length > 0;

const ServiceBoxesForm = (props) => {
  const [dataError, setdataError] = useState();
  const [notification, setNotification] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const authCtx = useContext(AuthContext);

  const login_token = authCtx.token;

  useEffect(() => {
    if (notification === "success created" || notification === "error") {
      const timer = setTimeout(() => {
        setNotification(null);
        setdataError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isText);

  const {
    value: textValue,
    isValid: textIsValid,
    hasError: textHasError,
    valueChangeHandler: textChangeHandler,
    inputBlurHandler: textBlurHandler,
    reset: resetText,
  } = useInput(isText);

  const handleChange = (file) => {
    setSelectedFile(file[0]);
  };

  let formIsValid = false;

  if (titleIsValid && textIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const connectDB = ConnectToDB("create/section/slider");

    const headers = {
      Authorization: `Bearer ${login_token}`,
    };

    console.log(props.slideCount);

    if (!props.titles[+props.slideNumber - 1]) {
      props.getTitles(titleValue);
    } else {
      props.titles[+props.slideNumber - 1] = titleValue;
    }

    if (!props.texts[+props.slideNumber - 1]) {
      props.getTexts(textValue);
    } else {
      props.texts[+props.slideNumber - 1] = textValue;
    }

    if (!props.images[+props.slideNumber - 1]) {
      props.getImages(selectedFile);
    } else {
      props.images[+props.slideNumber - 1] = selectedFile;
    }
  };

  return (
    <section className={classes.auth}>
      <h2>Box {props.slideNumber}</h2>
      <Form onSubmit={submitHandler}>
        <Row className="mb-3" className={classes.control}>
          <Form.Group
            as={Col}
            controlId="formGridFName"
            className={classes.formGroup}
          >
            <Form.Label>Title*</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
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

        <Row className="mb-3" className={classes.control}>
          <Form.Group
            as={Col}
            controlId="formGridMobile"
            className={classes.formGroup}
          >
            <Form.Label>text*</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="text"
              required
              value={textValue}
              onChange={textChangeHandler}
              onBlur={textBlurHandler}
            />

            {textHasError && (
              <Alert className="mt-1" variant="danger">
                Please enter a valid Name.
              </Alert>
            )}
          </Form.Group>
        </Row>
        <Row className={classes.control}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="image"
              id="image"
              type="file"
              onChange={(e) => handleChange(e.target.files)}
              size="sm"
            />
          </Form.Group>
        </Row>

        <div className={classes.actions}>
          <button disabled={!formIsValid} variant="primary" type="submit">
            Save
          </button>
        </div>
      </Form>

      {notification && (
        <Notification
          status={notifDetails.status}
          title={notifDetails.title}
          message={notifDetails.message}
        />
      )}
    </section>
  );
};

export default ServiceBoxesForm;
