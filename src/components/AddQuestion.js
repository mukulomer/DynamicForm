import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { padding } from "@mui/system";

const AddedElement = (props) => {
  let { key, addAnswer, setData } = props;
  let [value, setValue] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 5 }}>
      <InputGroup size="sm" className="mb-3">
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="answer"
          required
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <Button
          onClick={() => addAnswer(value)}
          variant="outline-secondary"
          id="button-addon2"
        >
          add
        </Button>
      </InputGroup>
    </div>
  );
};

function Question(props) {
  let { show, setShow, setData, data } = props;
  let [checkBoxTitle, setCheckBoxTitle] = useState("Question Types");
  let [checkBoxAnswers, setCheckBoxAnswers] = useState([]);
  let [count, setCount] = useState(0);
  let [questions, setQuestions] = useState({
    questionKey: "",
    questionTitle: "",
    checkBoxAnswers: [],
    paragraphAnswer: ""
  });
  const handleClose = () => setShow(false);
  const handleChange = (value, key) => {
    if (key === "question")
      setQuestions({ ...questions, questionTitle: value });
    console.log("value", value, key, questions);
  };
  const addAnswer = (answer) => {
    console.log("answer", answer);
    let answers = [
      ...questions.checkBoxAnswers,
      { value: answer, selected: false }
    ];
    setQuestions({ ...questions, checkBoxAnswers: answers });
  };

  const handleCheckBox = (value) => {
    setCheckBoxTitle(value);
  };

  const handleSubmit = () => {
    setShow(false);
    if (checkBoxTitle === "Question Types") {
      alert("please add checkBoxTitle");
      return;
    } else if (!questions.questionTitle) {
      alert("please add Question Title");
      return;
    } else if (checkBoxTitle !== "Paragraph" && !questions.checkBoxAnswers[0]) {
      alert("please add Options");
      return;
    }

    setData([
      ...data,
      {
        questionKey: data.length,
        question: questions.questionTitle,
        questionType: checkBoxTitle !== "Paragraph" ? "checkBox" : "paragraph",
        checkBoxAnswers: questions.checkBoxAnswers
      }
    ]);
    console.log(questions);
  };
  const isCheckBox = () => {
    if (checkBoxTitle === "CheckBox List") {
      return (
        <>
          {[...Array(count)].map((_, i) => (
            <AddedElement key={i} count={count} addAnswer={addAnswer} />
          ))}
          <Button variant="secondary" onClick={() => setCount(count + 1)}>
            {" "}
            Add Another Answer
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Questions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label> Question Type</Form.Label>
              <br></br>
              <DropdownButton
                as={ButtonGroup}
                size="sm"
                variant="secondary"
                title={checkBoxTitle}
              >
                <Dropdown.Item
                  eventKey="1"
                  onClick={(e) => handleCheckBox("CheckBox List")}
                >
                  CheckBox List
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  eventKey="2"
                  onClick={(e) => handleCheckBox("Paragraph")}
                >
                  Paragraph
                </Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Add Question</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="type question here.."
                rows={3}
                required
                onChange={(e) => handleChange(e.target.value, "question")}
              />
            </Form.Group>
            <div
              style={{ display: "flex", flexDirection: "column", padding: 5 }}
            >
              {isCheckBox()}
            </div>
            {/* <InputGroup className="mb-3">
           <InputGroup.Checkbox aria-label="Checkbox for following text input" />
        <Form.Control aria-label="Text input with checkbox" />
         </InputGroup> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Question;
