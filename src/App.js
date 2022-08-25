import React from "react";
import "./style/styles.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import ReviewAnswers from "./components/Review";

export default function App() {
  return (
    <div>
      <h1 className="header">Dynamic Form</h1>
      <Switch>
        <Route exact path="/">
          <Redirect to="/form/builder" />
        </Route>
        <Route default path="/form/builder" component={Home} />
        <Route default path="/form/answers" component={ReviewAnswers} />
      </Switch>
    </div>
  );
}
