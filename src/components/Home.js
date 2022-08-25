import "../style/styles.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import AddQuestion from "./AddQuestion";
import Form from "./Form";

export default function Home() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([
    {
      questionKey: 0,
      question: "Question 1",
      questionType: "checkBox",
      checkBoxAnswers: [
        { value: "mukul", selected: false },
        { value: "arun", selected: false },
        { value: "manish", selected: false }
      ]
    }
  ]);
  const handleShow = () => setShow(true);

  return (
    <>
      <Form data={data} handleShow={handleShow} />
      <AddQuestion
        show={show}
        setShow={setShow}
        data={data}
        setData={setData}
      />
    </>
  );
}
