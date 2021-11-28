import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { getData } from "../../../lib/get-data";
import classes from "../../../styles/dashboard.module.css";
import SliderSection from "../../../components/sections/SliderSection";

const AllPage = () => {
  const [pages, setPages] = useState([]);

  useEffect(async () => {
    const data = await getData("getAllPage");

    console.log(data);
    setPages(data.pages);
  }, []);

  console.log(pages);
  return (
    <div className="dashboard">
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
                  <Link href={`/${page.id}`}>View page</Link>
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllPage;
