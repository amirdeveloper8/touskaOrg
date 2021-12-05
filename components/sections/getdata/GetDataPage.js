import { useContext, useRef, useState } from "react";
import {
  CloseButton,
  Alert,
  Button,
  Tab,
  Row,
  Col,
  Nav,
  Table,
} from "react-bootstrap";
import AuthContext from "../../../store/auth-context";
import classes from "./getdatapage.module.css";
import { BiEdit } from "react-icons/bi";
import { FcAddRow } from "react-icons/fc";
import UpdateSimple from "../updatemodules/UpdateSimple";
import UpdateAll from "../updatemodules/UpdateAll";
import UpdatePlans from "../updatemodules/UpdatePlans";
import UpdateTeams from "../updatemodules/UpdateTeams";
import AddAll from "../addnew/all/AddAll";
import ListAccordion from "./ListAccordion";
import UpdateAccordion from "../updatemodules/UpdateAccordion";
import AddAccordion from "../addnew/accordion/AddAccordion";
import AddPlans from "../addnew/plans/AddPlans";
import AddTeam from "../addnew/teams/AddTeam";
import GetTabs from "./table/GetTabs";
import GetTable from "./table/GetTable";
import GetTh from "./table/getTh";
import GetCms from "./table/GetCms";
import GetTf from "./table/GetTf";
import GetTitlesTable from "./table/GetTitlesTable";
import UpdateTable from "./table/UpdateTable";
import AddTable from "../addnew/table/AddTable";
import UpdatePortfolio from "../updatemodules/UpdatePortfolio";
import AddPortfolio from "../addnew/potfolio/AddAll";
import UpdateWorkSamples from "../updatemodules/UpdateWorkSamples";
import AddSampleWorks from "../addnew/sampleworks/addSampleWorks";
import UpdateContactForm from "../updatemodules/contact-form/UpdateContactForm";
import AddInputForms from "../addnew/contact-form/AddInputForms";
import UpdateHeadContactForm from "../updatemodules/contact-form/UpdateHeadContactForm";
import UpdateBanner from "../updatemodules/UpdateBanner";

const GetDataPage = (props) => {
  const [updateOne, setUpdateOne] = useState(false);
  const [addNew, setaddNew] = useState(false);
  const authCtx = useContext(AuthContext);
  const closeBtnRef = useRef();
  const closeHandler = () => {
    authCtx.closePageHandler();
  };
  if (!props.data) {
    return (
      <Alert variant="danger" className="m-2">
        <h2>No Section!</h2>
      </Alert>
    );
  }

  const updateSectionHandler = (event) => {
    const parent = event.target.parentElement;
    parent.setAttribute("id", "updateSection");
    console.log(parent);
    setUpdateOne(true);
  };

  const noUpdateHandler = (event) => {
    const parent = event.target.parentElement.parentElement;
    parent.setAttribute("id", "updatenone");
    setUpdateOne(false);
  };

  const addColumnHandler = (event) => {
    const parent = event.target.parentElement.parentElement;
    parent.setAttribute("id", "addNew");
    setaddNew(true);
  };

  if (props.data.page.sections) {
    const sections = props.data.page.sections;
    console.log(sections);

    return (
      <section className={classes.page}>
        <h1>Content Of Page</h1>
        <CloseButton className={classes.close} onClick={closeHandler} />

        {sections.map((sec) => (
          <div key={sec.id} className={classes.section}>
            <h2>type:{sec.type.name}</h2>
            {sec.type_id !== 11 && (
              <UpdateTable data={sec.title} tableId={sec.id} />
            )}
            {sec.type_id === 11 && <UpdateHeadContactForm data={sec} />}

            {sec.type_id !== 6 &&
              sec.type_id !== 8 &&
              sec.type_id !== 10 &&
              sec.type_id !== 11 &&
              sec.section_content.map((item, index) => (
                <div ref={closeBtnRef} key={index} className={classes.content}>
                  <div
                    className={classes.fakeBtn}
                    onClick={updateSectionHandler}
                  ></div>
                  <div className={`${classes.details} details`}>
                    {sec.type_id !== 7 && sec.type_id !== 9 && (
                      <div>
                        <img src={item.image_url} />
                      </div>
                    )}
                    {sec.type_id !== 7 && sec.type_id === 9 && (
                      <div>
                        <img src={item.image} />
                      </div>
                    )}
                    <div className={sec.type_id === 7 ? classes.accordion : ""}>
                      <h3 className="text-center">
                        {sec.type_id === 1 ? item.title : item.title.content}
                      </h3>
                      {/* <h4>{item.title.subtitle}</h4> */}
                      <p>
                        {sec.type_id !== 5 &&
                          sec.type_id !== 1 &&
                          sec.type_id !== 7 &&
                          sec.type_id !== 9 &&
                          sec.type_id !== 12 &&
                          item.texts.content}
                        {sec.type_id === 5 && item.title.subtitle}
                      </p>
                      {(sec.type_id === 7 || sec.type_id === 1) && (
                        <ListAccordion items={item.texts.content} />
                      )}
                      {sec.type_id === 12 && (
                        <ListAccordion items={item.subtitle} />
                      )}
                      {sec.type_id === 5 && (
                        <ul>
                          {JSON.parse(item.item.lists).map((list, idx) => (
                            <li key={idx}>{list}</li>
                          ))}
                        </ul>
                      )}
                      {sec.type_id === 5 ||
                        (sec.type_id === 9 && (
                          <p className="text-primary">
                            button name: {item.button.name}
                          </p>
                        ))}
                      {sec.type_id === 5 ||
                        (sec.type_id === 9 && (
                          <p className="text-primary">
                            button url: {item.button.url}
                          </p>
                        ))}
                    </div>
                  </div>
                  <div className="updateForm">
                    {sec.type_id === 1 && updateOne && (
                      <UpdateSimple
                        richTxt={item.texts.content}
                        updateData={item}
                        sec={sec}
                      />
                    )}
                    {sec.type_id === 5 && updateOne && (
                      <UpdatePlans updateData={item} sec={sec} />
                    )}
                    {sec.type_id === 7 && updateOne && (
                      <UpdateAccordion
                        richTxt={item.texts.content}
                        updateData={item}
                        sec={sec}
                      />
                    )}
                    {sec.type_id === 9 && updateOne && (
                      <UpdatePortfolio updateData={item} sec={sec} />
                    )}
                    {sec.type_id === 12 && updateOne && (
                      <UpdateBanner
                        richTxt={item.subtitle}
                        updateData={item}
                        sec={sec}
                      />
                    )}
                    {sec.type_id !== 1 &&
                      sec.type_id !== 5 &&
                      sec.type_id !== 7 &&
                      sec.type_id !== 9 &&
                      sec.type_id !== 12 &&
                      updateOne && <UpdateAll updateData={item} sec={sec} />}

                    <CloseButton
                      className={classes.closeBtn}
                      onClick={noUpdateHandler}
                    />
                  </div>
                  <div className={classes.editBtn}>
                    <BiEdit />
                  </div>
                </div>
              ))}
            {sec.type_id === 6 &&
              sec.section_content.map((item, index) => (
                <div ref={closeBtnRef} key={index} className={classes.content}>
                  <div
                    className={classes.fakeBtn}
                    onClick={updateSectionHandler}
                  ></div>
                  <div className={`${classes.details} details`}>
                    <div>
                      <img src={item.image_url} />
                    </div>
                    <div>
                      <h3>Name: {item.name}</h3>

                      <p>Post: {item.post}</p>
                      <p>Character: {item.charecter}</p>
                      <ul>
                        {" "}
                        Social Url :
                        {item.socials.map((social) => (
                          <li key={social.id}>{social.url}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="updateForm">
                    {updateOne && <UpdateTeams updateData={item} sec={sec} />}
                    <CloseButton
                      className={classes.closeBtn}
                      onClick={noUpdateHandler}
                    />
                  </div>
                  <div className={classes.editBtn}>
                    <BiEdit />
                  </div>
                </div>
              ))}
            {sec.type_id === 8 && (
              <section className={classes.editTable}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="table1">
                  <Row className={classes.tableGet}>
                    <Col sm={12}>
                      <Nav className="mx-3" variant="pills">
                        {sec.section_content.tab.map((item, index) => (
                          <GetTabs
                            key={index}
                            number={index + 1}
                            data={item}
                            tableId={sec.section_content.id}
                          />
                        ))}
                      </Nav>
                    </Col>
                    <Col sm={12}>
                      <GetTitlesTable
                        data={sec.section_content.titleHeader}
                        tableId={sec.section_content.id}
                        type="titleHeader"
                      />

                      <GetTh
                        data={JSON.parse(sec.section_content.th)}
                        tableId={sec.section_content.id}
                      />
                    </Col>
                    <Col sm={12}>
                      <Tab.Content>
                        {sec.section_content.tab.map((item, index) => (
                          <GetTable
                            key={index}
                            number={index + 1}
                            data={item}
                            tableId={sec.section_content.id}
                          />
                        ))}
                      </Tab.Content>
                    </Col>
                    <Col sm={12}>
                      <GetTitlesTable
                        data={sec.section_content.titleFooter}
                        tableId={sec.section_content.id}
                        type="titleFooter"
                      />
                      <GetTf
                        data={JSON.parse(sec.section_content.tf)}
                        tableId={sec.section_content.id}
                      />
                    </Col>
                  </Row>
                  <Row className={classes.tableGet}>
                    <Col sm={12}>
                      <GetCms
                        data={JSON.parse(sec.section_content.comments)}
                        tableId={sec.section_content.id}
                      />
                    </Col>
                  </Row>
                </Tab.Container>
              </section>
            )}
            {sec.type_id === 10 &&
              sec.section_content.map((item, index) => (
                <section key={index} className={classes.worksamples}>
                  <div className={`details ${classes.worksampleItems}`}>
                    <div className={classes.boxWorksamples}>
                      <h3>Box Items:</h3>
                      <h4>title : {item.title_box}</h4>
                      <img src={item.image_box_url} />
                    </div>
                    <div className={classes.prjWorksamples}>
                      <h3>Project Items:</h3>
                      <h4>title: {item.title_project}</h4>
                      <h5>name: {item.name_project}</h5>
                      <p>
                        url: <a href={item.url_project}>{item.url_project}</a>
                      </p>
                      <p>button name: {item.buttons.name}</p>
                      <img src={item.image_project_url} />
                    </div>
                  </div>

                  <div className="updateForm">
                    {updateOne && (
                      <UpdateWorkSamples updateData={item} sec={sec} />
                    )}
                    <CloseButton
                      className={classes.closeBtn}
                      onClick={noUpdateHandler}
                    />
                  </div>
                  <div className={classes.editBtn}>
                    <BiEdit />
                  </div>
                  <div
                    className={classes.fakeBtn}
                    onClick={updateSectionHandler}
                  ></div>
                </section>
              ))}
            {sec.type_id === 11 &&
              sec.section_content.map((item, index) => (
                <section key={index} className={classes.contactforms}>
                  <div className={`details ${classes.contactformItems}`}>
                    <h3>type: {item.type_namee}</h3>
                    <h5>Name: {item.name}</h5>
                    <p>label: {item.label}</p>
                    <p>placeholder: {item.placeholder}</p>
                    {JSON.parse(item.options).length !== 0 && (
                      <ul>
                        options:
                        {JSON.parse(item.options).map((option, index) => (
                          <li key={index}>{option}</li>
                        ))}
                        {/* {item.options} */}
                      </ul>
                    )}
                    <p>valid: {item.valid ? item.valid : "false"}</p>
                  </div>

                  <div className="updateForm">
                    {updateOne && (
                      <UpdateContactForm updateData={item} sec={sec} />
                    )}
                    <CloseButton
                      className={classes.closeBtn}
                      onClick={noUpdateHandler}
                    />
                  </div>
                  <div className={classes.editBtn}>
                    <BiEdit />
                  </div>
                  <div
                    className={classes.fakeBtn}
                    onClick={updateSectionHandler}
                  ></div>
                </section>
              ))}
            <div className="addnewcol">
              <div className="addForm">
                {sec.type_id === 5 && addNew && (
                  <AddPlans secId={sec.id} typeId={sec.type_id} />
                )}
                {sec.type_id === 6 && addNew && (
                  <AddTeam secId={sec.id} typeId={sec.type_id} />
                )}
                {sec.type_id === 7 && addNew && (
                  <AddAccordion secId={sec.id} typeId={sec.type_id} />
                )}
                {sec.type_id === 9 && addNew && (
                  <AddPortfolio secId={sec.id} typeId={sec.type_id} />
                )}
                {sec.type_id === 10 && addNew && (
                  <AddSampleWorks secId={sec.id} typeId={sec.type_id} />
                )}
                {sec.type_id === 11 && addNew && (
                  <AddInputForms secId={sec.id} typeId={sec.type_id} />
                )}

                {(sec.type_id === 2 ||
                  sec.type_id === 3 ||
                  sec.type_id === 4) &&
                  addNew && <AddAll secId={sec.id} typeId={sec.type_id} />}
                <CloseButton
                  className={classes.closeBtn}
                  onClick={noUpdateHandler}
                />
              </div>
              <div className="addTable">
                {sec.type_id === 8 && addNew && (
                  <AddTable
                    tableId={sec.section_content.id}
                    numberOfColumns={JSON.parse(sec.section_content.th).length}
                    typeId={sec.type_id}
                  />
                )}
              </div>
              {sec.type_id !== 1 && (
                <div className={classes.addColumn}>
                  <button
                    type="button"
                    onClick={addColumnHandler}
                    value={sec.type_id}
                  ></button>
                  <FcAddRow />
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    );
  }
};

export default GetDataPage;
