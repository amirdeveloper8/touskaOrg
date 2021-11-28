import { Accordion, Container } from "react-bootstrap";
import ListAccordion from "./getdata/ListAccordion";

const AccordionSection = (props) => {
  const title = props.details.title;
  const content = props.details.section_content;
  console.log("accccord", content);
  return (
    <Container className="py-5">
      <h2 className="text-center">{title}</h2>
      <Accordion defaultActiveKey="0">
        {content.map((item, index) => (
          <Accordion.Item key={index} eventKey={index}>
            <Accordion.Header>{item.title.content}</Accordion.Header>
            <Accordion.Body>
              <ListAccordion items={item.texts.content} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default AccordionSection;
