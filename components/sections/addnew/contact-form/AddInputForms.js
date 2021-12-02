import classes from "../add.module.css";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { ConnectToDB } from "../../../../lib/connect-to-db";
import useInput from "../../../../hooks/use-input";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../store/auth-context";

import AddOptionForm from "./AddOptionForm";

import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { getData } from "../../../../lib/get-data";

const isText = (value) => value.trim().length > 0;

const AddInputForms = (props) => {
  const [dataError, setdataError] = useState();
  const [notification, setNotification] = useState();

  const [hasGroup, setHasGroup] = useState(true);

  const [value, setValue] = useState("choose inputs");
  const [inputId, setInputId] = useState();

  const [optionCount, setOptionCount] = useState(1);
  const [options, setOptions] = useState([]);

  const [checkVal, setCheckVal] = useState(false);

  const [inputs, setInputs] = useState([]);

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
    value: labelValue,
    isValid: labelIsValid,
    hasError: labelHasError,
    valueChangeHandler: labelChangeHandler,
    inputBlurHandler: labelBlurHandler,
    reset: resetLabel,
  } = useInput(isText);

  const {
    value: placeholderValue,
    isValid: placeholderIsValid,
    hasError: placeholderHasError,
    valueChangeHandler: placeholderChangeHandler,
    inputBlurHandler: placeholderBlurHandler,
    reset: resetPlaceholder,
  } = useInput(isText);

  const {
    value: validValue,
    isValid: validIsValid,
    hasError: validHasError,
    valueChangeHandler: validChangeHandler,
    inputBlurHandler: validBlurHandler,
    reset: resetValid,
  } = useInput(isText);

  const getOptions = (option) => {
    setOptions([...options, option]);
  };

  let optionSec = [];

  for (let i = 0; i < optionCount; i++) {
    optionSec[i] = (
      <AddOptionForm getOptions={getOptions} options={options} number={i + 1} />
    );
  }

  const selectChangeHandler = (e) => {
    const val = e.target.value;
    setValue(val);
  };

  const submitIdHandler = async () => {
    const dataInput = await getData("get/typeTable/contactForm");
    setInputs(dataInput.page);
    const valId = value.split(".");
    setInputId(valId[0]);
    console.log(valId[0]);
    setHasGroup(true);
    console.log(value);
  };

  const checkHandler = (e) => {
    const val = e.target.checked;
    setCheckVal(val);
  };

  let formIsValid = false;

  if (titleIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    console.log("options", options);
    console.log("titleValue", titleValue);
    console.log("value", inputId);
    console.log("labelValue", labelValue);
    console.log("placeholderValue", placeholderValue);
    console.log("validValue", validValue);
  };

  return (
    <section className={classes.auth}>
      <h2>Add New Input</h2>
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
              {inputs.map((input) => (
                <option key={input.id}>
                  {input.id}. {input.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group
            as={Col}
            lg={12}
            controlId="formGridFName"
            className={classes.formGroup}
          >
            <Form.Label>Name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
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
            <Form.Label>Label*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Label"
              required
              value={labelValue}
              onChange={labelChangeHandler}
              onBlur={labelBlurHandler}
            />

            {labelHasError && (
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
            <Form.Label>Placeholder*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Placeholder"
              required
              value={placeholderValue}
              onChange={placeholderChangeHandler}
              onBlur={placeholderBlurHandler}
            />

            {placeholderHasError && (
              <Alert className="mt-1" variant="danger">
                Please enter a valid Title.
              </Alert>
            )}
          </Form.Group>

          {(value.includes("radio") ||
            value.includes("check") ||
            value.includes("select")) &&
            hasGroup && (
              <div className={classes.optionInput}>
                {optionSec}
                <AiFillPlusCircle
                  className={classes.addOption}
                  onClick={() => setOptionCount(optionCount + 1)}
                />
                {optionCount > 1 && (
                  <AiFillMinusCircle
                    className={classes.delOption}
                    onClick={() => setOptionCount(optionCount - 1)}
                  />
                )}
              </div>
            )}

          <Form.Group
            className={classes.formCheck}
            controlId={`formBasicCheckbox${props.slideNumber}`}
          >
            <Form.Check
              onChange={checkHandler}
              value={checkVal}
              type="checkbox"
              label="Check me out"
            />
          </Form.Group>
          {checkVal && (
            <Form.Group
              as={Col}
              lg={12}
              controlId="formGridFName"
              className={classes.formGroup}
            >
              <Form.Label>Validation*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Validation"
                required
                value={validValue}
                onChange={validChangeHandler}
                onBlur={validBlurHandler}
              />

              {validHasError && (
                <Alert className="mt-1" variant="danger">
                  Please enter a valid Title.
                </Alert>
              )}
            </Form.Group>
          )}
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

export default AddInputForms;
