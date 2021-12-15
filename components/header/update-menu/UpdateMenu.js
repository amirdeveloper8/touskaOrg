import useInput from "../../../hooks/use-input";
import UpdateMenuItems from "./UpdateMenuItems";

import Button from "../../ui/Button";

import classes from "./update-menu.module.css";
import { Form } from "react-bootstrap";
const isText = (value) => value.trim().length > 0;

const UpdateMenu = (props) => {
  const data = props.data;
  let items = [];

  for (let i = 0; i < data.length; i++) {
    items[i] = <UpdateMenuItems key={i} number={i} item={data[i]} />;
  }
  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isText);
  return (
    <section className={classes.updateMenu}>
      <Form>{items}</Form>
    </section>
  );
};

export default UpdateMenu;
