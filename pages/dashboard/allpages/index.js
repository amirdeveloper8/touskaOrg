import { useContext, useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import Link from "next/link";
import { Col, Button as Btn, Row, CloseButton } from "react-bootstrap";
import { getData } from "../../../lib/get-data";
import classes from "../../../styles/dashboard.module.css";

import Modal from "../../../components/ui/Modal";

import { AiFillDelete } from "react-icons/ai";
import { ConnectToDB } from "../../../lib/connect-to-db";
import AuthContext from "../../../store/auth-context";
import axios from "axios";

const AllPage = () => {
  const [pages, setPages] = useState([]);
  const [pageId, setPageId] = useState();
  const [seo, setSeo] = useState();

  const authCtx = useContext(AuthContext);
  const login_token = authCtx.token;
  const showPage = authCtx.showPage;

  useEffect(async () => {
    const data = await getData("getAllPage");

    console.log(data);
    setPages(data.pages);
  }, [showPage]);

  const deleteHandler = async (event) => {
    event.preventDefault();

    const connectDB = ConnectToDB("deletepage");

    const headers = {
      Authorization: `Bearer ${login_token}`,
    };

    const fData = new FormData();
    fData.append("id", pageId);

    axios({
      method: "POST",
      url: connectDB,
      headers: headers,
      data: fData,
    })
      .then((res) => {
        console.log("res", res.data);
        if (res.data.status === "success deleted") {
          console.log(res.data);

          setTimeout(() => {
            authCtx.closePageHandler();
            setPageId();
          }, 1000);
          setTimeout(() => {
            authCtx.showPageHandler();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  console.log(pages);
  return (
    <div className="dashboard">
      {showPage && (
        <Row>
          {pages.map((page) => (
            <Col key={page.id} lg={4} md={6} xs={12}>
              <div className={classes.pageDetails}>
                <h2>{page.title}</h2>
                <p>{page.excerpt}</p>
                <div className={classes.buttonPages}>
                  <Button>
                    <Link href={`/dashboard/createpage/${page.id}`}>Edit</Link>
                  </Button>
                  <Button>
                    <Link href={`/${page.url}`}>View page</Link>
                  </Button>
                  <Button>
                    <Link href={`/dashboard/seo/${page.id}`}>Update Seo</Link>
                  </Button>
                </div>
                <AiFillDelete
                  className={classes.deletePage}
                  onClick={() => setPageId(page.id)}
                />
              </div>
            </Col>
          ))}
          {pageId && (
            <Modal>
              <Row>
                <Col lg={12}>
                  <h4>Are you sure ?</h4>
                </Col>
                <Col lg={6}>
                  <Btn
                    onClick={deleteHandler}
                    variant="success"
                    className="w-100"
                  >
                    Yes
                  </Btn>
                </Col>
                <Col lg={6}>
                  <Btn
                    onClick={() => setPageId()}
                    variant="danger"
                    className="w-100"
                  >
                    No
                  </Btn>
                </Col>
              </Row>
            </Modal>
          )}
        </Row>
      )}
    </div>
  );
};

export default AllPage;
