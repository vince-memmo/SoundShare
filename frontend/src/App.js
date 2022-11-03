
import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginFormModal/LoginForm.js";
import SignupFormPage from "./components/SignupFormModal/SignupForm";
import SplashPage from "./components/SplashPage";
import { Swiper, SwiperSlide } from 'swiper'
import Navigation from "./components/Navigation";
import DiscoverPage from "./components/DiscoverPage/index.js";
import Tracks from './components/Tracks/index'
import TrackUploadPage from "./components/TrackForm/index.js";
import TrackUpdatePage from './components/TrackUpdateForm/index'

function App() {
  return (
    <>
    <Switch>
      <Route exact path="/">
          <SplashPage />
      </Route>
      <Route exact path="/discover">
          <Navigation />
          <DiscoverPage />
      </Route>
      <Route path={`/:userId/tracks`}>
          <Tracks />
      </Route>
      <Route path={`/:userId/upload`}>
          <TrackUploadPage />
      </Route>
      <Route path={`/tracks/:trackId/edit`}>
          <TrackUpdatePage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
