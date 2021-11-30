import classes from "../create.module.css";
import { Form, Row, Col, Alert, Dropdown } from "react-bootstrap";
import { ConnectToDB } from "../../../../lib/connect-to-db";
import useInput from "../../../../hooks/use-input";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../store/auth-context";
import Notification from "../../../ui/notification";
import axios from "axios";
import { getData } from "../../../../lib/get-data";

const isText = (value) => value.trim().length > 0;

const InputForms = (props) => {
  const [dataError, setdataError] = useState();
  const [notification, setNotification] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const [inputs, setInputs] = useState([]);

  const [value, setValue] = useState("select inputs");
  const [inputId, setInputId] = useState();

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

  const getInputsHandler = async () => {
    const dataInput = await getData("get/typeTable/contactForm");
    setInputs(dataInput.page);
    console.log(inputs);
  };

  let noId;

  const selectChangeHandler = (e) => {
    const val = e.target.value;
    setValue(val);
  };

  const submitIdHandler = () => {
    const valId = value.split(".");
    setInputId(valId[0]);
    console.log(valId[0]);
  };

  let formIsValid = false;

  if (titleIsValid) {
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

    if (!props.ids[+props.slideNumber - 1]) {
      props.getIds(+inputId);
    } else {
      props.ids[+props.slideNumber - 1] = +inputId;
    }
  };

  return (
    <section className={classes.auth}>
      <h2>Input {props.slideNumber}</h2>
      <Form onSubmit={submitHandler}>
        <Row className="mb-3" className={classes.control}>
          <Form.Group
            as={Col}
            lg={12}
            controlId="formGridFName"
            className={classes.formGroup}
          >
            <Form.Select
              onChange={selectChangeHandler}
              value={value}
              onClick={submitIdHandler}
            >
              <option>Select Input</option>
              {/* {inputs.length === 0 && <option>Select Your Input</option>} */}
              {props.inputs &&
                props.inputs.map((input) => (
                  <option key={input.id}>
                    {input.id}. {input.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

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

        <div className={classes.actions}>
          <button disabled={!formIsValid} variant="primary" type="submit">
            Save
          </button>
        </div>
      </Form>
    </section>
  );
};

export default InputForms;
