import { useState } from "react";
import { Col, Form, Alert } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import CreateLink1 from "./CreateLink1";

import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";

import Button from "../ui/Button";

import classes from "./footer.module.css";
import { getData } from "../../lib/get-data";
import CreateSocials from "./CreateSocials";

const isText = (value) => value.trim().length > 0;
const CreateFooter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [link1Count, setLink1Count] = useState(2);
  const [link1Urls, setLink1Urls] = useState([]);
  const [link2Count, setLink2Count] = useState(2);
  const [link2Urls, setLink2Urls] = useState([]);
  const [socialsCount, setSocialsCount] = useState(1);
  const [socialsValues, setSocialsValues] = useState([]);

  const [socials, setSocials] = useState([]);
  const [createSocials, setCreateSocials] = useState(false);

  let link1 = [];

  for (let i = 0; i < link1Count; i++) {
    link1[i] = <CreateLink1 linkUrls={link1Urls} number={i} key={i} />;
  }

  let link2 = [];

  for (let i = 0; i < link2Count; i++) {
    link2[i] = <CreateLink1 linkUrls={link2Urls} number={i} key={i} />;
  }

  let socialsSec = [];

  for (let i = 0; i < socialsCount; i++) {
    socialsSec[i] = (
      <CreateSocials
        socials={socials}
        value={socialsValues}
        key={i}
        number={i}
      />
    );
  }

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isText);

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isText);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isText);

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(isText);

  const handleChange = (file) => {
    setSelectedFile(file[0]);
  };

  const decreaseLink1 = () => {
    if (link1Count > 1) {
      setLink1Count(link1Count - 1);
    }
  };

  const decreaseLink2 = () => {
    if (link2Count > 1) {
      setLink2Count(link2Count - 1);
    }
  };

  const decreaseSocialsCount = () => {
    if (socialsCount > 1) {
      setSocialsCount(socialsCount - 1);
    }
  };

  const createSocilasHandler = async (e) => {
    const socialDetails = await getData("get/contactform/typeSocial");
    setSocials(socialDetails.typeSocial);
    setCreateSocials(true);

    console.log(socials);
  };

  const submitHandler = (e) => {
    let link1Value = [];
    for (let i = 0; i < link1Count; i++) {
      link1Value[i] = link1Urls[i];
    }

    let link2Value = [];
    for (let i = 0; i < link2Count; i++) {
      link2Value[i] = link2Urls[i];
    }

    e.preventDefault();
    console.log("description", descriptionValue);
    console.log("image", selectedFile);
    console.log("links1", JSON.stringify(link1Value));
    console.log("links2", JSON.stringify(link2Value));
    console.log("tel", phoneValue);
    console.log(
      "adress",
      JSON.stringify({ content: addressValue, type_id: 5 })
    );
    console.log("email", JSON.stringify({ content: emailValue, type_id: 13 }));
    for (let i = 0; i < socialsCount; i++) {
      console.log(`socials_${i + 1}`, JSON.stringify(socialsValues[i]));
    }
  };
  return (
    <Form onSubmit={submitHandler} className={classes.createFooter}>
      <div className={classes.createFooterBox} lg={3}>
        <h2>توضیحات</h2>
        <Form.Group lg={12} className="mb-3">
          <Form.Label>Logo*</Form.Label>
          <Form.Control
            name="image"
            id="image"
            type="file"
            onChange={(e) => handleChange(e.target.files)}
            size="sm"
          />
        </Form.Group>
        <Form.Group
          as={Col}
          lg={12}
          controlId="formGridFName"
          className={classes.formGroup}
        >
          <Form.Label>description</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={5}
            placeholder="description"
            value={descriptionValue}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
          />

          {descriptionHasError && (
            <Alert className="mt-1" variant="danger">
              Please enter a valid description.
            </Alert>
          )}
        </Form.Group>
      </div>
      <div className={classes.createFooterBox} lg={3}>
        <h2>خدمات</h2>
        {link1}
        <div className={classes.countIcons}>
          <AiFillPlusSquare onClick={() => setLink1Count(link1Count + 1)} />
          <AiFillMinusSquare onClick={decreaseLink1} />
        </div>
      </div>
      <div className={classes.createFooterBox} lg={3}>
        <h2>لینک‌های مفید</h2>
        {link2}
        <div className={classes.countIcons}>
          <AiFillPlusSquare onClick={() => setLink2Count(link2Count + 1)} />
          <AiFillMinusSquare onClick={decreaseLink2} />
        </div>
      </div>
      <div className={classes.createFooterBox} lg={3}>
        <h2>آدرس شرکت</h2>
        <Form.Group
          as={Col}
          lg={12}
          controlId="formGridFName"
          className={classes.formGroup}
        >
          <Form.Label>address</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={5}
            placeholder="address"
            value={addressValue}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
          />

          {addressHasError && (
            <Alert className="mt-1" variant="danger">
              Please enter a valid address.
            </Alert>
          )}
        </Form.Group>

        <Form.Group
          as={Col}
          lg={12}
          controlId="formGridFName"
          className={classes.formGroup}
        >
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />

          {emailHasError && (
            <Alert className="mt-1" variant="danger">
              Please enter a valid email.
            </Alert>
          )}
        </Form.Group>

        <Form.Group
          as={Col}
          lg={12}
          controlId="formGridFName"
          className={classes.formGroup}
        >
          <Form.Label>phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="phone"
            value={phoneValue}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
          />

          {phoneHasError && (
            <Alert className="mt-1" variant="danger">
              Please enter a valid phone.
            </Alert>
          )}
        </Form.Group>
        {!createSocials && (
          <Button
            className={classes.btnCreateSocials}
            onClick={createSocilasHandler}
          >
            Create Socials
          </Button>
        )}
        {createSocials && socialsSec}
        {createSocials && (
          <div className={classes.countIcons}>
            <AiFillPlusSquare
              onClick={() => setSocialsCount(socialsCount + 1)}
            />
            <AiFillMinusSquare onClick={decreaseSocialsCount} />
          </div>
        )}
      </div>
      <div className={classes.actions}>
        <Button>submit</Button>
      </div>
    </Form>
  );
};

export default CreateFooter;
