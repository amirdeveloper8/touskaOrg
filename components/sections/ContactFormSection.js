import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import BaseInput from "../ui/inputs/BaseInput";
import FileInput from "../ui/inputs/FileInput";
import RadioInput from "../ui/inputs/RadioInput";
import SelectInput from "../ui/inputs/SelectInput";
import Button from "../ui/Button";
import classes from "./contactform.module.css";

const ContactFormSection = (props) => {
  const data = props.details.section_content;
  const imgSrc = props.details.photo_url;
  const title = props.details.title;

  let value = [];

  for (let i = 0; i < data.length; i++) {
    value[i] = [data[i].name, ""];
  }

  const getValue = (number, name) => {
    value[number] = [data[number].name, name];
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <section className={classes.contactForm}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.details}>
        <div className={classes.imageC}>
          <img src={imgSrc} />
        </div>
        <Form onSubmit={submitHandler}>
          {data.map((item, index) => (
            <Row key={index}>
              {(item.type_namee === "text" ||
                item.type_namee === "number" ||
                item.type_namee === "email" ||
                item.type_namee === "textarea" ||
                item.type_namee === "colorpicker" ||
                item.type_namee === "password") && (
                <BaseInput
                  data={item}
                  id={`${props.details.id}_${index}`}
                  number={index + 1}
                  getValue={getValue}
                  value={value}
                />
              )}
              {item.type_namee === "file" && (
                <FileInput
                  id={`${props.details.id}_${index}`}
                  name={item.name}
                  getValue={getValue}
                  number={index + 1}
                />
              )}
              {(item.type_namee === "radioButton" ||
                item.type_namee === "checkbox") && (
                <RadioInput
                  id={`${props.details.id}_${index}`}
                  data={item}
                  getValue={getValue}
                  number={index + 1}
                />
              )}
              {item.type_namee === "select" && (
                <SelectInput
                  id={`${props.details.id}_${index}`}
                  data={item}
                  getValue={getValue}
                  number={index + 1}
                />
              )}

              {item.type_namee === "submit" && (
                <div className={classes.actions}>
                  <Button>ارسال پیام</Button>
                </div>
              )}
            </Row>
          ))}
        </Form>
      </div>
    </section>
  );
};

export default ContactFormSection;
