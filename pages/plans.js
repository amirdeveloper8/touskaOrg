import { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { getData } from "../lib/get-data";

import Button from "../components/ui/Button";

import classes from "../styles/plans.module.css";
import axios from "axios";
import { ConnectToDB } from "../lib/connect-to-db";
import PlansStep2 from "../components/plans/front/PlansStep2";

const Plans = (props) => {
  const [catDetails, setCatDetails] = useState(props.valCats.cats);
  const [itemDetails, setItemDetails] = useState({ status: "nothing" });

  const [valueBox, setValueBox] = useState("Open this select menu");
  const [typeValue, setTypeValue] = useState();

  const [step1, setStep1] = useState(true);

  // useEffect(async () => {
  //   const valCats = await getData("get/semiplan/cat");

  //   setCatDetails(valCats.cats);
  // }, []);

  const changeHandler = (e) => {
    const value = e.target.value;
    const val = value.split(".");
    setValueBox(value);

    setTypeValue(+val[0]);
    console.log("value", typeValue);
  };

  const categories = catDetails.filter(
    (item) => item.name !== "پایه" && item.name !== "پیشنهادی"
  );

  console.log("catDetails", catDetails);

  const backStep1Handler = () => {
    setStep1(true);
  };

  const submitHandler = () => {
    console.log(typeValue);

    const connectDB = ConnectToDB("get/semiplan/panel");

    const fData = new FormData();

    fData.append("category_id", typeValue);

    console.log(typeValue);

    axios({
      method: "POST",
      url: connectDB,
      data: fData,
    })
      .then((res) => {
        console.log("res", res.data);
        if (res.data.status === "success") {
          setItemDetails(res.data);
          console.log(itemDetails);
          setStep1(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <section className={`${classes.plans} whiteSec`}>
      {step1 && (
        <Form.Group
          as={Col}
          lg={12}
          controlId="formGridFName"
          className={classes.selectCategory}
        >
          <Form.Label className={classes.labelSelect}>
            نوع سایت را انتخاب کنید؟
          </Form.Label>
          <Form.Select
            value={valueBox}
            onChange={changeHandler}
            aria-label="Default select example"
          >
            <option>انتخاب پلن ...</option>
            {categories.map((box) => (
              <option key={box.id} value={`${box.id}.${box.name}`}>
                {box.name}
              </option>
            ))}
          </Form.Select>
          <div className={classes.actions}>
            <Button onClick={submitHandler}>مرحله بعد</Button>
          </div>
        </Form.Group>
      )}
      {itemDetails.status === "success" && !step1 && (
        <PlansStep2 value={itemDetails} backStep1={backStep1Handler} />
      )}
    </section>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(`http://api.touskaweb.com/api/get/semiplan/cat`);
  const valCats = await response.json();

  return {
    props: {
      valCats,
    },
  };
};

export default Plans;
