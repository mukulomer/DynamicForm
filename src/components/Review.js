import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

const Review = (props) => {
  const [data, setData] = useState(props.location.state);
  const history = useHistory();
  console.log(props.location.state);
  return (
    <Form>
      {data.map((element) => {
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
                <p>{element.paragraphAnswer} </p>
              ) : (
                element.checkBoxAnswers.map((answer, key) => {
                  return (
                    <Form.Group
                      className="mb-3"
                      key={key}
                      controlId="formBasicCheckbox"
                    >
                      <Form.Check
                        type="checkbox"
                        label={answer.value}
                        checked={answer.selected}
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
        <Button
          style={{ padding: 10, margin: 10 }}
          variant="outline-secondary"
          onClick={() => history.push("/form/builder")}
          type="submit"
        >
          Back to Forms Builder
        </Button>
      </div>
    </Form>
  );
};

export default Review;
