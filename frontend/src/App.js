
import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SplashPage from "./components/SplashPage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
    <Navigation />
    <Switch>
      <Route exact path="/">
          <SplashPage />
      </Route>
      <Route path="/login">
          <LoginForm />
      </Route>
      <Route path="/signup">
          <SignupFormPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
