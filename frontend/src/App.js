
import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginFormModal/LoginForm.js";
import SignupFormPage from "./components/SignupFormModal/SignupForm";
import SplashPage from "./components/SplashPage";
import { Swiper, SwiperSlide } from 'swiper'
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
    <Navigation />
    <Switch>
      <Route exact path="/">
          <SplashPage />
      </Route>
    
    </Switch>
    </>
  );
}

export default App;
