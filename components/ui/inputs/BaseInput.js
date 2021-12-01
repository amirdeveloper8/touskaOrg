import { Alert, Col, Form, Row } from "react-bootstrap";
import useInput from "../../../hooks/use-input";
import classes from "./input.module.css";

const isText = (value) => value.trim().length > 0;
const isEmail = (value) => value.trim().includes("@");
const BaseInput = (props) => {
  const type = props.type;
  let validType = isText;
  let inputType = "text";
  let asType;
  if (type === "email") {
    validType = isEmail;
    inputType = "email";
  }
  if (type === "number") {
    inputType = "number";
  }
  if (type === "password") {
    inputType = "password";
  }
  if (type === "textarea") {
    asType = "textarea";
  }
  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(validType);
  return (
    <Form.Group as={Col} lg={12} controlId={`formGridFName${props.id}`}>
      <Form.Label>{props.name}*</Form.Label>
      <Form.Control
        type={inputType}
        as={asType}
        placeholder={props.name}
        required
        value={titleValue}
        onChange={titleChangeHandler}
        onBlur={titleBlurHandler}
      />

      {titleHasError && (
        <Alert className="mt-1" variant="danger">
          {props.name}
        </Alert>
      )}
    </Form.Group>
  );
};

export default BaseInput;
