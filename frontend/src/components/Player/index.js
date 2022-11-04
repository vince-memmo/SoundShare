import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Player.css';
import {Howl, Howler} from 'howler';
import { useState } from 'react';
import { receiveQueue, getQueue } from '../../store/queue';
import { useEffect } from 'react';
import { receivePlaying } from '../../store/playing';

function Player() {
  const sessionUser = useSelector(state => state.session.user);
  const playing = useSelector(state => state.playing);
  const track = useSelector(getQueue)
  const dispatch = useDispatch()
  const [prevSrc, setPrevSrc] = useState('')
  const [src, setSrc] = useState('')
  const [paused, setPaused] = useState(true)
  const [audio, setAudio] = useState( new Audio(track.songUrl))

  useEffect(() => {
    if (playing) {
      playSong()
    } else { 
      pauseSong()
    }
    changeButtons()
  }, [playing])

  const handleClick = (track) => {
    const playButton = document.querySelector(`.player-play-pause`);
    if (playButton.innerHTML === 'Play') {
        dispatch(receiveQueue(track))
        dispatch(receivePlaying(true))
    } else {
        dispatch(receivePlaying(false))
    }
  }

  const changeButtons = () => {
    if (track.songUrl) {
      const itemButton = document.querySelector(`.play-pause-${track.id}`);
      const playButton = document.querySelector(`.player-play-pause`);
      if (playButton.innerHTML === 'Play') {
        playButton.innerHTML = 'Pause'
      } else {
          playButton.innerHTML = 'Play'
      }
      if (itemButton.innerHTML === 'Play') {
        itemButton.innerHTML = 'Pause'
      } else {
        itemButton.innerHTML = 'Play'
      }
    }
  }

  const playSong = () => {
    if (track.songUrl) {
      audio.src = track.songUrl
      audio.play()
    }
  }

  const pauseSong = () => {
    audio.pause()
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className='player-controls'>
          <button className='player-skip-back'>Back</button>
          <button className='player-play-pause' playValue='play' onClick={() => handleClick(track)}>Play</button>
          <button className='player-skip-forward'>For</button>
          <div className='player-time'></div>
          <button className='player-volume'>Mute</button>
          <div className='player-thumbnail'></div>
        </div>
      </>
    );
  }

  return (
    <section className='player-section'>{sessionLinks}</section>
  );
}
export default Player;

 // const handlePlay = (track) => {
  //     dispatch(receiveQueue(track))
  //     if((prevSrc === track.songUrl && prevSrc !== '') && paused === false){
  //         // sound.pause()
  //         setPaused(!paused)
  //     } else {
  //         // sound._src = track.songUrl
  //         setPaused(!paused)
  //         playSong()
  //     }
  //     setPrevSrc(track.songUrl)
  //     const playButton = document.querySelector(`.play-pause-${track.id}`);
  //     if (playButton.innerHTML === 'Play') {
  //         playButton.innerHTML = 'Pause'
  //     } else {
  //         playButton.innerHTML = 'Play'
  //     }
  // }