
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
import Player from "./components/Player/index.js";
import PlaylistForm from "./components/Playlist/PlaylistForm.js";
import Playlists from "./components/Playlist/index.js";
import Library from "./components/Library/index.js";
import PlaylistShowPage from "./components/Playlist/PlaylistShowPage.js";
import UsersIndex from "./components/UserIndex/index.js";


function App() {
  return (
    <>
    <Navigation />
    <Switch>
      <Route exact path="/">
          <SplashPage />
      </Route>
      <Route exact path="/discover">
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
      <Route path={`/playlist`}>
          <PlaylistForm />
      </Route>
      <Route exact path={`/playlists`}>
          <Playlists />
      </Route>
      <Route path={`/create_playlist`}>
          <PlaylistForm />
      </Route>
      <Route path={`/library`}>
          <Library />
      </Route>
      <Route path={`/users`}>
          <UsersIndex />
      </Route>
      <Route path={`/playlists/:playlistId`}>
          <PlaylistShowPage />
      </Route>
    </Switch>
    <Player />
    </>
  );
}


export default App;
