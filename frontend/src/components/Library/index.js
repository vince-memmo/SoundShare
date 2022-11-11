import './index.css'
import React, { Component } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PlaylistLibrary from './PlaylistsLibrary';
import TracksLibrary from './TracksLibrary'
import PlaylistIndexItem from "../Playlist/PlaylistIndexItem";
import { useState } from 'react';


function Library() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [selected, setSelected] = useState('playlists')
    
    useEffect(() => { 
    }, [dispatch])

    const display = () => {
      if (selected === 'playlists') {
        if (document.querySelector(`.library-playlists-button`)) document.querySelector(`.library-playlists-button`).style.color = '#f0'
        if (document.querySelector(`.library-tracks-button`)) document.querySelector(`.library-tracks-button`).style.color = 'black'
        return <PlaylistLibrary />
      } else if (selected === 'tracks') {
        if (document.querySelector(`.library-tracks-button`)) document.querySelector(`.library-tracks-button`).style.color = '#f0'
        if (document.querySelector(`.library-playlists-button`)) document.querySelector(`.library-playlists-button`).style.color = 'black'
        return <TracksLibrary />
      }
    }
    
    return (
      <>
        <div className='library-body'>
            <div className='headers'>
                <div className='library-playlists-button' onClick={() => setSelected('playlists')}>Playlists</div>
                <div className='library-likes-button' onClick={() => setSelected('likes')}>Likes</div>
                <div className='library-tracks-button' onClick={() => setSelected('tracks')}>Tracks</div>
            </div>
            <div className='header-divider'></div>
            <div className='display-container'>
                {display()}
            </div>
        </div>
      </>
    )
  }
  
  export default Library;