import classes from "../create.module.css";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { ConnectToDB } from "../../../../lib/connect-to-db";
import useInput from "../../../../hooks/use-input";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../store/auth-context";
import Notification from "../../../ui/notification";
import NewRich from "../../../richtexteditor/NewRich";

const isText = (value) => value.trim().length > 0;

const AccordionForm = (props) => {
  const [dataError, setdataError] = useState();
  const [notification, setNotification] = useState();
  const [textValue, setTextValue] = useState([]);

  const authCtx = useContext(AuthContext);

  const login_token = authCtx.token;

  const getTextValue = (value) => {
    setTextValue([value.split("\n")]);
    console.log(textValue);
  };

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

  let formIsValid = false;

  if (titleIsValid && textValue.length > 0) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(textValue);

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

    console.log(textValue);
  };

  return (
    <section className={classes.auth}>
      <h2>Slide {props.slideNumber}</h2>
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
            <NewRich getTexts={getTextValue} />
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

export default AccordionForm;
