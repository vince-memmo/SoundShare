import React, { useRef }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Player.css';
import { useState } from 'react';
import { receiveQueue, getQueue, getTrack } from '../../store/queue';
import { useEffect } from 'react';
import { receivePlaying } from '../../store/playing';
import ProgressBar from './ProgressBar';
import { receiveDuration, getDuration } from '../../store/duration';

function Player() {
  const sessionUser = useSelector(state => state.session.user);
  const playing = useSelector(state => state.playing);
  const progClick = useSelector(state => state.progClick);
  const track = useSelector(getQueue)
  const duration = useSelector(getDuration)
  const audioRef = useRef()
  const dispatch = useDispatch()
  const [currentSong, setCurrentSong] = useState({id: 'init'})
  const [audio, setAudio] = useState( new Audio(track.songUrl))
  const [pauseTime, setPauseTime] = useState(0)
  const [percentage, setPercentage] = useState(0)
  let limitedInterval;

  useEffect(() => {
    
    if (playing.active) {
      playSong()
      const playButton = document.getElementById(`play-pause-button`);
      if (track.songUrl && playButton.className !== 'player-pause') changeButtons()
    } else { 
      pauseSong()
      if (track.songUrl) changeButtons()
    }
  }, [playing])

  useEffect(() => {
    if (playing.active) {
      limitedInterval = setInterval(() => {
        if (duration.time !== 0) {    
          setPercentage(audio.currentTime/duration.time)
        }
      }, 100);
    }
    return () => clearInterval(limitedInterval);

  }, [playing])

  useEffect(() => {
    changeTime()
  }, [progClick])

  const changeTime = () => {
    if (track.id) {
      audio.currentTime = duration.time*progClick.click
    }
  }

  const handleClick = (track) => {
    if (!track.id) return
    const playButton = document.getElementById(`play-pause-button`);
    const duration = document.getElementById(`audio-${track.id}`).duration
    if (playButton.className === 'player-play') {
        dispatch(receiveDuration(duration))
        dispatch(receiveQueue(track))
        dispatch(receivePlaying(true))
    } else {
        dispatch(receivePlaying(false))
    }
  }

  const changeButtons = () => {
      const playButton = document.getElementById(`play-pause-button`);
      if (playButton.className === 'player-play') {
        playButton.className = 'player-pause'
      } else {
          playButton.className = 'player-play'
      }
  }

  const playSong = () => {
    if (currentSong.id !== 'init'){
      const prevItemButton = document.getElementById(`play-pause-${currentSong.id}`);
      prevItemButton.className = 'play-item-play'
    }
    if (track.id) {
      const itemButton = document.getElementById(`play-pause-${track.id}`);
      itemButton.className = 'play-item-pause'
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
      const pausedItemButton = document.getElementById(`play-pause-${currentSong.id}`);
      pausedItemButton.className = 'play-item-play'
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
            <div className='player-play' id='play-pause-button' onClick={() => handleClick(track)}></div>
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