import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

const Forms = (props) => {
  let { data, handleShow } = props;
  const history = useHistory();

  const [formData, setFormData] = useState([
    {
      questionKey: "",
      question: "",
      questionType: "",
      paragraphAnswer: "",
      checkBoxAnswers: []
    }
  ]);

  const handleChange = (value, type, key) => {
    let questionsData = data;
    data = data.filter((data) => data.questionKey === key);
    console.log("modified Data", key, data);
    if (data[0] && data[0].questionType === "paragraph")
      data[0].paragraphAnswer = value;
    else if (data[0]) {
      let checkBoxValue = data[0].checkBoxAnswers.map((answer) => {
        if (answer.value == value) answer.selected = true;
        return answer;
      });

      data[0].checkBoxAnswers = checkBoxValue;
    }
    questionsData.forEach((questions) => {
      if (questions.questionKey === key) {
        questions = data;
      }
    });

    console.log("after update", data, questionsData);
    setFormData(questionsData);
  };

  const reviewAnswer = () => {
    history.push({
      pathname: "/form/answers",
      state: formData
    });
  };
  return (
    <Form>
      {data.map((element, key) => {
        return (
          <div
            style={{
              width: 400,
              height: 200,
              display: "flex",
              flexDirection: "column",
              margin: 50,
              marginBottom: 0
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <b>{element.question}</b>
              </Form.Label>
              {element.questionType !== "checkBox" ? (
                <Form.Control
                  as="textarea"
                  placeholder="type Answer here.."
                  rows={3}
                  onChange={(e) =>
                    handleChange(e.target.value, "paragraph", key)
                  }
                />
              ) : (
                element.checkBoxAnswers.map((answer, count) => {
                  return (
                    <Form.Group
                      className="mb-3"
                      key={count}
                      controlId="formBasicCheckbox"
                    >
                      <Form.Check
                        type="checkbox"
                        label={answer.value}
                        value={answer.value}
                        onChange={(e) =>
                          handleChange(e.target.value, "checkBox", key)
                        }
                      />
                    </Form.Group>
                  );
                })
              )}
            </Form.Group>
          </div>
        );
      })}
      <div style={{ width: 200, height: 100, margin: 10, marginLeft: 50 }}>
        <Button variant="primary" onClick={handleShow}>
          Add Question
        </Button>
        <Button
          style={{ padding: 10, margin: 10 }}
          onClick={reviewAnswer}
          variant="success"
          type="submit"
        >
          Review My Answers
        </Button>
      </div>
    </Form>
  );
};
export default Forms;
