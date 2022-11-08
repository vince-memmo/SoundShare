import './index.css'
import React, { Component } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PlaylistLibrary from './PlaylistsLibrary';
import PlaylistIndexItem from "../Playlist/PlaylistIndexItem";


function Library() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const display = <PlaylistLibrary />

    
    useEffect(() => { 
    }, [dispatch])

    const displayPlaylists = () => {

    }
    const displayLikes = () => {

    }

    const displayTracks = () => {

    }
    
    return (
      <>
        <div className='library-body'>
            <div className='headers'>
                <div onClick={displayPlaylists}>Playlists</div>
                <div onClick={displayLikes}>Likes</div>
                <div onClick={displayTracks}>Tracks</div>
            </div>
            <div className='header-divider'></div>
            <div className='display-container'>
                {display}
            </div>
        </div>
      </>
    )
  }
  
  export default Library;