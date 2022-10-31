
import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginFormModal/LoginForm.js";
import SignupFormPage from "./components/SignupFormModal/SignupForm";
import SplashPage from "./components/SplashPage";
import { Swiper, SwiperSlide } from 'swiper'
import Navigation from "./components/Navigation";
import DiscoverPage from "./components/DiscoverPage/index.js";

function App() {
  return (
    <>
    <Switch>
      <Route exact path="/">
          <SplashPage />
      </Route>
      <Route path="/discover">
          <Navigation />
          <DiscoverPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
