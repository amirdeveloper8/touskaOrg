import classes from "../create.module.css";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { ConnectToDB } from "../../../../lib/connect-to-db";
import useInput from "../../../../hooks/use-input";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../store/auth-context";
import Notification from "../../../ui/notification";
import { MdOutlineFileDownloadDone } from "react-icons/md";

const isText = (value) => value.trim().length > 0;

const PortfolioForm = (props) => {
  const [checked, setChecked] = useState(false);

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
    value: buttonNameValue,
    isValid: buttonNameIsValid,
    hasError: buttonNameHasError,
    valueChangeHandler: buttonNameChangeHandler,
    inputBlurHandler: buttonNameBlurHandler,
    reset: resetButtonName,
  } = useInput(isText);

  const {
    value: buttonUrlValue,
    isValid: buttonUrlIsValid,
    hasError: buttonUrlHasError,
    valueChangeHandler: buttonUrlChangeHandler,
    inputBlurHandler: buttonUrlBlurHandler,
    reset: resetButtonUrl,
  } = useInput(isText);

  const handleChange = (file) => {
    setSelectedFile(file[0]);
  };

  let formIsValid = false;

  if (
    titleIsValid &&
    buttonUrlIsValid &&
    buttonNameIsValid &&
    selectedFile !== null
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const connectDB = ConnectToDB("create/section/slider");

    const headers = {
      Authorization: `Bearer ${login_token}`,
    };

    if (!props.titles[+props.slideNumber - 1]) {
      props.getTitles(titleValue);
    } else {
      props.titles[+props.slideNumber - 1] = titleValue;
    }

    if (!props.buttonNames[+props.slideNumber - 1]) {
      props.getButtonNames(buttonNameValue);
    } else {
      props.buttonNames[+props.slideNumber - 1] = buttonNameValue;
    }

    if (!props.buttonUrls[+props.slideNumber - 1]) {
      props.getButtonUrls(buttonUrlValue);
    } else {
      props.buttonUrls[+props.slideNumber - 1] = buttonUrlValue;
    }

    if (!props.images[+props.slideNumber - 1]) {
      props.getImages(selectedFile);
    } else {
      props.images[+props.slideNumber - 1] = selectedFile;
    }

    setChecked(true);
  };

  return (
    <section className={classes.auth}>
      <h2>Slide {props.slideNumber}</h2>
      <Form onSubmit={submitHandler}>
        {checked && (
          <MdOutlineFileDownloadDone className={classes.saveChecked} />
        )}
        <Row className={`mb-3 ${classes.control}`}>
          <Form.Group
            as={Col}
            onBlur={() => setChecked(false)}
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

        <Row className={`mb-3 ${classes.control}`}>
          <Form.Group
            as={Col}
            onBlur={() => setChecked(false)}
            controlId="formGridMobile"
            className={classes.formGroup}
          >
            <Form.Label>button name*</Form.Label>
            <Form.Control
              placeholder="button name"
              required
              value={buttonNameValue}
              onChange={buttonNameChangeHandler}
              onBlur={buttonNameBlurHandler}
            />

            {buttonNameHasError && (
              <Alert className="mt-1" variant="danger">
                Please enter a valid button name.
              </Alert>
            )}
          </Form.Group>
        </Row>
        <Row className={`mb-3 ${classes.control}`}>
          <Form.Group
            as={Col}
            onBlur={() => setChecked(false)}
            controlId="formGridMobile"
            className={classes.formGroup}
          >
            <Form.Label>button url*</Form.Label>
            <Form.Control
              placeholder="button url"
              required
              value={buttonUrlValue}
              onChange={buttonUrlChangeHandler}
              onBlur={buttonUrlBlurHandler}
            />

            {buttonUrlHasError && (
              <Alert className="mt-1" variant="danger">
                Please enter a valid button url.
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

export default PortfolioForm;
