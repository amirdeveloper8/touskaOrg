import useInput from "../../../hooks/use-input";
import { Alert, Badge, Col, Form, Row, Button } from "react-bootstrap";
import { useState } from "react";

import classes from "./update-menu.module.css";

import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { getData } from "../../../lib/get-data";
import UpdateSubs from "./UpdateSubs";
import UpdateAddSub from "./UpdateAddSub";

const isText = (value) => value.trim().length > 0;

const UpdateMenuItems = (props) => {
  const item = props.item;
  const subs = item.submenu;

  const [checked, setChecked] = useState(false);

  const [valueBox, setValueBox] = useState("Open this select menu");
  const [menuItems, setMenuItems] = useState([]);
  const [usePageId, setUsePageId] = useState(false);
  const [typeValue, setTypeValue] = useState();

  const [resetItemValue, setResetItemValue] = useState(false);
  const [resetUrlValue, setResetUrlValue] = useState(false);

  const [subValues, setSubValues] = useState(subs);

  const [viewSubs, setViewSubs] = useState(false);

  const [newSubCount, setNewSubCount] = useState(0);
  const [newSubsValue, setNewSubsValue] = useState([]);

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

  let subItems = [];
  let subItemsForSend = [];

  for (let i = 0; i < subs.length; i++) {
    if (subs[i].url) {
      subItemsForSend[i] = {
        name: subs[i].name,
        page_id: "",
        url: subs[i].url,
      };
    }
    if (!subs[i].url) {
      subItemsForSend[i] = {
        name: subs[i].name,
        page_id: subs[i].page_id,
        url: "",
      };
    }
    subItems[i] = (
      <UpdateSubs key={i} number={i} subs={subItemsForSend} item={subs[i]} />
    );
  }

  let newSubs = [];

  for (let i = 0; i < newSubCount; i++) {
    newSubs[i] = <UpdateAddSub key={i} number={i} item={newSubsValue} />;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    {
      itemValue && console.log("name", itemValue);
    }
    {
      urlValue && console.log("url", itemValue);
    }
    {
      typeValue && console.log("page_id", typeValue);
    }
    console.log(subValues);
    console.log(subItemsForSend);
    console.log(newSubsValue);
  };

  const url = !item.page_id ? item.url : item.page.url;
  return (
    <Row className="mb-3" className={classes.control}>
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

        {itemHasError && resetItemValue && (
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

          {urlHasError && resetUrlValue && (
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
      {subItems.length > 0 && (
        <div className="bg-dark p-3 mt-3">
          {!viewSubs && (
            <Button
              onClick={() => setViewSubs(true)}
              className={`w-100 ${classes.btnSubs}`}
              variant="info"
            >
              {" "}
              View Subs{" "}
            </Button>
          )}
          {viewSubs && (
            <Button
              onClick={() => setViewSubs(false)}
              className={`w-100 ${classes.btnSubs}`}
              variant="danger"
            >
              {" "}
              Close Subs{" "}
            </Button>
          )}

          {viewSubs && subItems}
          {viewSubs && newSubs}
          {viewSubs && (
            <div className={classes.addNewSubsIcons}>
              <AiFillPlusSquare
                onClick={() => setNewSubCount(newSubCount + 1)}
              />
              {newSubCount > 0 && (
                <AiFillMinusSquare
                  onClick={() => setNewSubCount(newSubCount - 1)}
                />
              )}
            </div>
          )}
        </div>
      )}
      {subItems.length === 0 && (
        <div className="bg-secondary p-3 mt-3">
          {!viewSubs && (
            <Button
              onClick={() => setNewSubCount(newSubCount + 1)}
              className={`w-100 ${classes.btnSubs}`}
              variant="info"
            >
              {" "}
              Create Subs{" "}
            </Button>
          )}
          {viewSubs && (
            <Button
              onClick={() => setViewSubs(false)}
              className={`w-100 ${classes.btnSubs}`}
              variant="danger"
            >
              {" "}
              Cancel{" "}
            </Button>
          )}
          {newSubs}
          {newSubCount > 0 && (
            <div className={classes.addNewSubsIcons}>
              <AiFillPlusSquare
                onClick={() => setNewSubCount(newSubCount + 1)}
              />

              <AiFillMinusSquare
                onClick={() => setNewSubCount(newSubCount - 1)}
              />
            </div>
          )}
        </div>
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

export default UpdateMenuItems;
