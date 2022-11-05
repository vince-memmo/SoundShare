import React, { useRef }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Player.css';
import { useState } from 'react';
import { receiveQueue, getQueue, getTrack } from '../../store/queue';
import { useEffect } from 'react';
import { receivePlaying } from '../../store/playing';
import ProgressBar from './ProgressBar';

function Player() {
  const sessionUser = useSelector(state => state.session.user);
  const playing = useSelector(state => state.playing);
  const progClick = useSelector(state => state.progClick);
  const track = useSelector(getQueue)
  // const track = useSelector(getTrack)
  // debugger
  const audioRef = useRef()
  const dispatch = useDispatch()
  const [currentSong, setCurrentSong] = useState({id: 'init'})
  const [audio, setAudio] = useState( new Audio(track.songUrl))
  const [pauseTime, setPauseTime] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (playing) {
      playSong()
    } else { 
      pauseSong()
    }
    if (track.songUrl) changeButtons()
  }, [playing])

  useEffect(() => {
    const limitedInterval = setInterval(() => {
      if (duration) {
        setPercentage(audio.currentTime/duration)
      }
      if (!playing) {
        clearInterval(limitedInterval);
      }
    }, 100);
  }, [playing])

  useEffect(() => {
    console.log(progClick)
    changeTime()
  }, [progClick])

  const changeTime = () => {
    if (track.id) {
      audio.currentTime = duration*progClick.click
    }
  }


  const handleClick = (track) => {
    if (!track.id) return
    const playButton = document.querySelector(`.player-play-pause`);
    const duration = document.getElementById(`audio-${track.id}`).duration
    if (playButton.innerHTML === 'Play') {
        dispatch(receiveQueue(track, duration))
        dispatch(receivePlaying(true))
    } else {
        dispatch(receivePlaying(false))
    }
  }

  const changeButtons = () => {
      const prevItemButton = document.querySelector(`.play-pause-${track.id}`);
      const itemButton = document.querySelector(`.play-pause-${track.id}`);
      const playButton = document.querySelector(`.player-play-pause`);
      if (playButton.innerHTML === 'Play') {
        playButton.innerHTML = 'Pause'
      } else {
          playButton.innerHTML = 'Play'
      }
  }

  const playSong = () => {
    if (currentSong.id !== 'init'){
      const prevItemButton = document.querySelector(`.play-pause-${currentSong.id}`);
      prevItemButton.innerHTML = 'Play'
    }
    if (track.id) {
      setDuration(document.getElementById(`audio-${track.id}`).duration)
      const itemButton = document.querySelector(`.play-pause-${track.id}`);
      itemButton.innerHTML = 'Pause'
      if (track.id === currentSong.id) {
        audio.currentTime = pauseTime
        setCurrentSong(track)
        audio.play()
      } else {
        audio.src = track.songUrl
        setCurrentSong(track)
        audio.play()
      }
    }
  }

  const pauseSong = () => {
    if (currentSong !== track) {
      dispatch(receivePlaying(true))
    } else {
      const pausedItemButton = document.querySelector(`.play-pause-${currentSong.id}`);
      pausedItemButton.innerHTML = 'Play'
      setPauseTime(audio.currentTime)
      audio.pause()
    }
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className='player-controls'>
          <button className='player-skip-back'>Back</button>
          <button className='player-play-pause' playValue='play' onClick={() => handleClick(track)}>Play</button>
          <button className='player-skip-forward'>For</button>
            <ProgressBar percentage={percentage}/>
            <audio id="audio" ref={audioRef} src={audio.src}></audio>
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