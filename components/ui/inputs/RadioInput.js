import { Col, Form } from "react-bootstrap";

const RadioInput = (props) => {
  return (
    <Col sm={4}>
      <Form.Check
        type="radio"
        label={props.name}
        name="formHorizontalRadios"
        id={`formHorizontalRadios${props.number}`}
      />
    </Col>
  );
};

export default RadioInput;
