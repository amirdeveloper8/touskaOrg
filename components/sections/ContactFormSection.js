import { Col, Form, Row } from "react-bootstrap";
import BaseInput from "../ui/inputs/BaseInput";
import FileInput from "../ui/inputs/FileInput";
import RadioInput from "../ui/inputs/RadioInput";
import classes from "./contactform.module.css";

const ContactFormSection = (props) => {
  const data = props.details.section_content;
  const imgSrc = props.details.photo_url;
  const title = props.details.title;

  return (
    <section className={classes.contactForm}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.details}>
        <Form>
          {data.map((item, index) => (
            <Row key={index}>
              {(item.type_namee === "text" ||
                item.type_namee === "number" ||
                item.type_namee === "email" ||
                item.type_namee === "textarea" ||
                item.type_namee === "password") && (
                <BaseInput
                  type={item.type_namee}
                  name={item.name}
                  id={`${props.details.id}_${index}`}
                />
              )}
              {item.type_namee === "file" && (
                <FileInput
                  id={`${props.details.id}_${index}`}
                  name={item.name}
                />
              )}
            </Row>
          ))}
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={12}>
                Radios
              </Form.Label>
              {data
                .filter((items) => items.groupname !== "0")
                .map((item, index) => (
                  <div>
                    {item.groupname === item.groupname && (
                      <RadioInput name={item.name} number={index + 1} />
                    )}
                  </div>
                ))}
            </Form.Group>
          </fieldset>
        </Form>
        <div className={classes.imageC}>
          <img src={imgSrc} />
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
