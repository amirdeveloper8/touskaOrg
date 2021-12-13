import classes from "./login.module.css";
import { Form, Row, Col, Badge, Alert, CloseButton } from "react-bootstrap";
import { ConnectToDB } from "../../lib/connect-to-db";
import useInput from "../../hooks/use-input";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";
import Notification from "../ui/notification";
import axios from "axios";

const isText = (value) => value.trim().length > 0;

const AddNew = () => {
  const [dataError, setdataError] = useState();
  const [notification, setNotification] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const authCtx = useContext(AuthContext);

  const router = useRouter();

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
    value: urlValue,
    isValid: urlIsValid,
    hasError: urlHasError,
    valueChangeHandler: urlChangeHandler,
    inputBlurHandler: urlBlurHandler,
    reset: resetUrl,
  } = useInput(isText);

  const {
    value: excerptValue,
    isValid: excerptIsValid,
    hasError: excerptHasError,
    valueChangeHandler: excerptChangeHandler,
    inputBlurHandler: excerptBlurHandler,
    reset: resetExcerpt,
  } = useInput(isText);

  const handleChange = (file) => {
    setSelectedFile(file[0]);
  };

  let formIsValid = false;

  if (urlIsValid && titleIsValid && excerptIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setNotification("pending");

    const connectDB = ConnectToDB("addpage");

    const headers = {
      Authorization: `Bearer ${login_token}`,
    };

    const fData = new FormData();

    fData.append("title", titleValue);
    fData.append("url", urlValue);
    fData.append("excerpt", excerptValue);
    fData.append("image", selectedFile);
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
          resetTitle();
          resetUrl();
          resetExcerpt();
          const pageId = res.data.page.id;
          router.replace(`/dashboard/createpage/${pageId}`);
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
      <h1>اطلاعات صفحه جدید را وارد کنید</h1>
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
            <Form.Label>Url*</Form.Label>
            <Form.Control
              type="text"
              placeholder="type url of page"
              required
              value={urlValue}
              onChange={urlChangeHandler}
              onBlur={urlBlurHandler}
            />

            {urlHasError && (
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
            <Form.Label>Excerpt*</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="excerpt"
              required
              value={excerptValue}
              onChange={excerptChangeHandler}
              onBlur={excerptBlurHandler}
            />

            {excerptHasError && (
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

export default AddNew;
