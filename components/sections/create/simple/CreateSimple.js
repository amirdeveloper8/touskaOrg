import classes from "../create.module.css";
import { Form, Row, Col, Badge, Alert, CloseButton } from "react-bootstrap";
import { ConnectToDB } from "../../../../lib/connect-to-db";
import useInput from "../../../../hooks/use-input";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../store/auth-context";
import Notification from "../../../ui/notification";
import axios from "axios";
import NewRich from "../../../richtexteditor/NewRich";

const isText = (value) => value.trim().length > 0;

const CreateSimple = (props) => {
  const [dataError, setdataError] = useState();
  const [notification, setNotification] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [textValue, setTextValue] = useState([]);

  console.log(props.pageId);

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
    value: btnNameValue,
    isValid: btnNameIsValid,
    hasError: btnNameHasError,
    valueChangeHandler: btnNameChangeHandler,
    inputBlurHandler: btnNameBlurHandler,
    reset: resetBtnName,
  } = useInput(isText);

  const {
    value: btnUrlValue,
    isValid: btnUrlIsValid,
    hasError: btnUrlHasError,
    valueChangeHandler: btnUrlChangeHandler,
    inputBlurHandler: btnUrlBlurHandler,
    reset: resetBtnUrl,
  } = useInput(isText);

  const getTextValue = (value) => {
    setTextValue([value.split("\n")]);
    console.log(textValue);
  };

  const handleChange = (file) => {
    setSelectedFile(file[0]);
  };

  let formIsValid = false;

  if (titleIsValid && textValue.length > 0) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setNotification("pending");

    const connectDB = ConnectToDB("create/section/simple");

    const headers = {
      Authorization: `Bearer ${login_token}`,
    };

    const fData = new FormData();

    fData.append("page_id", props.pageId);
    fData.append("type_id", 1);
    fData.append("title", titleValue);
    fData.append("text", JSON.stringify(textValue));
    fData.append("image", selectedFile);
    fData.append("button_name", btnNameValue);
    fData.append("button_url", btnUrlValue);
    console.log(props.pageId);
    axios({
      method: "POST",
      url: connectDB,
      headers: headers,
      data: fData,
    })
      .then((res) => {
        console.log("res", res.data);
        if (res.data.status === "success created") {
          console.log(res.data);
          setNotification(res.data.status);
          setTimeout(() => {
            authCtx.showPageHandler();
            authCtx.closeSimpleSection();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

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
    <section className={classes.auth}>
      <h1>Create Simple Section</h1>
      <Form onSubmit={submitHandler}>
        <Row className="mb-3" className={classes.control}>
          <Form.Group
            as={Col}
            lg={12}
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

        <Row
          className="mb-3"
          className={`${classes.richInput} ${classes.control}`}
        >
          <Form.Group
            as={Col}
            controlId="formGridMobile"
            className={classes.formGroup}
          >
            <Form.Label>text*</Form.Label>
            <NewRich getTexts={getTextValue} />
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
        <Row className="mb-3" className={classes.control}>
          <Form.Group
            as={Col}
            lg={12}
            controlId="formGridFName"
            className={classes.formGroup}
          >
            <Form.Label>Button Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Button Name"
              value={btnNameValue}
              onChange={btnNameChangeHandler}
              onBlur={btnNameBlurHandler}
            />

            {btnNameHasError && (
              <Alert className="mt-1" variant="danger">
                Please enter a valid Button Name.
              </Alert>
            )}
          </Form.Group>
          <Form.Group
            as={Col}
            lg={12}
            controlId="formGridFName"
            className={classes.formGroup}
          >
            <Form.Label>Button Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Button Url"
              value={btnUrlValue}
              onChange={btnUrlChangeHandler}
              onBlur={btnUrlBlurHandler}
            />

            {btnUrlHasError && (
              <Alert className="mt-1" variant="danger">
                Please enter a valid Button Url.
              </Alert>
            )}
          </Form.Group>
        </Row>
        <div className={classes.actions}>
          <button disabled={!formIsValid} variant="primary" type="submit">
            Submit
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

export default CreateSimple;
