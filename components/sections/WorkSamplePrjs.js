import classes from "./worksamples.module.css";
import Modal from "../ui/Modal";
import Link from "next/link";

import { CloseButton, Button } from "react-bootstrap";

const WorkSamplePrjs = (props) => {
  const data = props.data;

  const closeHandler = () => {
    props.showProjectHandler(null);
  };
  return (
    <Modal>
      <CloseButton className={classes.close} onClick={closeHandler} />
      <div className={classes.projects}>
        <div className={classes.prjDetails}>
          <h2>{data.title_project}</h2>
          <div className={classes.divider}></div>
          <p>{data.name_project}</p>
          <Button>
            <Link href={data.url_project}>{data.buttons.name}</Link>
          </Button>
        </div>
        <div className={classes.prjImg}>
          <img src={data.image_project_url} />
        </div>
      </div>
    </Modal>
  );
};

export default WorkSamplePrjs;
