
import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginFormPage";

function App() {
  return (
    <>
    <h1>Hello from App</h1>
    <Switch>
      <Route path="/login">
        <LoginForm />
      </Route>
    </Switch>
    </>
  );
}

export default App;
