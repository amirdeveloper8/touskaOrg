import useInput from "../../../hooks/use-input";
import { Alert, Badge, Col, Form, Row, Button } from "react-bootstrap";
import { useState } from "react";

import classes from "./update-menu.module.css";

import { AiFillEdit } from "react-icons/ai";
import { getData } from "../../../lib/get-data";

const isText = (value) => value.trim().length > 0;

const UpdateSubs = (props) => {
  const [checked, setChecked] = useState(false);

  const [valueBox, setValueBox] = useState("Open this select menu");
  const [menuItems, setMenuItems] = useState([]);
  const [usePageId, setUsePageId] = useState(false);
  const [typeValue, setTypeValue] = useState();

  const [resetItemValue, setResetItemValue] = useState(false);
  const [resetUrlValue, setResetUrlValue] = useState(false);

  const item = props.item;

  const {
    value: itemValue,
    isValid: itemIsValid,
    hasError: itemHasError,
    valueChangeHandler: itemChangeHandler,
    inputBlurHandler: itemBlurHandler,
    reset: resetItem,
  } = useInput(isText);

  const {
    value: urlValue,
    isValid: urlIsValid,
    hasError: urlHasError,
    valueChangeHandler: urlChangeHandler,
    inputBlurHandler: urlBlurHandler,
    reset: resetUrl,
  } = useInput(isText);

  const resetItemHandler = () => {
    setResetItemValue(true);
  };

  const resetUrlHandler = () => {
    setResetUrlValue(true);
  };

  const getPagesHandler = async () => {
    const data = await getData("getAllPage");
    const pageValues = data.pages;
    setMenuItems(pageValues);
    console.log(data);
    console.log(pageValues);
    setChecked(false);
  };

  const changeHandler = (e) => {
    const value = e.target.value;
    setChecked(false);
    const val = value.split(".");
    setValueBox(value);

    setTypeValue(+val[0]);
    console.log("value", typeValue);
  };

  const changeTypeUrl = () => {
    setUsePageId(!usePageId);
    setValueBox("open this");
    resetUrl();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("ok");

    if (itemValue) {
      props.subs[props.number].name = itemValue;
    }
    if (urlValue) {
      props.subs[props.number].url = urlValue;
      props.subs[props.number].page_id = "";
    }
    if (typeValue) {
      props.subs[props.number].url = "";
      props.subs[props.number].page_id = typeValue;
    }
  };

  const url = !item.page_id ? item.url : item.page.url;
  return (
    <Row className="mb-3" className={`${classes.subs} ${classes.control}`}>
      <Form.Group
        as={Col}
        lg={12}
        controlId="formGridFName"
        className={classes.formGroup}
      >
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          required
          value={resetItemValue ? itemValue : item.name}
          onChange={itemChangeHandler}
          onBlur={itemBlurHandler}
        />

        {itemHasError && (
          <Alert className="mt-1" variant="danger">
            Please enter a valid Name.
          </Alert>
        )}
        {!resetItemValue && (
          <AiFillEdit className={classes.edit} onClick={resetItemHandler} />
        )}
      </Form.Group>
      {!usePageId && (
        <Form.Group
          as={Col}
          lg={12}
          controlId="formGridFName"
          className={classes.formGroup}
        >
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Url"
            required
            value={resetUrlValue ? urlValue : url}
            onChange={urlChangeHandler}
            onBlur={urlBlurHandler}
          />

          {urlHasError && (
            <Alert className="mt-1" variant="danger">
              Please enter a valid Url.
            </Alert>
          )}
          {!resetUrlValue && (
            <AiFillEdit className={classes.edit} onClick={resetUrlHandler} />
          )}
          {resetUrlValue && (
            <Badge className={classes.badge} onClick={changeTypeUrl}>
              Select from Pages
            </Badge>
          )}
        </Form.Group>
      )}
      {resetUrlValue && usePageId && (
        <Form.Group
          as={Col}
          lg={12}
          controlId="formGridFName"
          className={classes.formGroup}
        >
          <Form.Label>Select Page*</Form.Label>
          <Form.Select
            value={valueBox}
            onChange={changeHandler}
            onClick={getPagesHandler}
            aria-label="Default select example"
          >
            <option>Select Item ...</option>
            {menuItems.map((box) => (
              <option key={box.id} value={`${box.id}.${box.title}`}>
                {box.id}. {box.title}
              </option>
            ))}
          </Form.Select>
          <Badge className={classes.badge} onClick={changeTypeUrl}>
            Use Custome Url
          </Badge>
        </Form.Group>
      )}
      <Button
        onClick={submitHandler}
        className={classes.saveItem}
        variant="success"
      >
        Save
      </Button>
    </Row>
  );
};

export default UpdateSubs;
