import React, { useRef }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Player.css';
import { useState } from 'react';
import { receiveQueue, getQueue, getTrack } from '../../store/queue';
import { useEffect } from 'react';
import { receivePlaying } from '../../store/playing';
import ProgressBar from './ProgressBar';
import { receiveDuration, getDuration } from '../../store/duration';
import PlaylerThumbnail from './PlayerThumbnail';

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

  const muteToggle = () => {
    // debugger
    const muteButton = document.getElementById('player-mute-button')
    if (muteButton.className === `player-mute`) {
      audio.volume = 0
      muteButton.className='player-unmute'
    } else {
      audio.volume = 1
      muteButton.className='player-mute'
    }
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
          <div className='player-controls'>
            <div className='player-skip-back'></div>
            <div className='player-play' id='play-pause-button' onClick={() => handleClick(track)}></div>
            <div className='player-skip-forward'></div>
              <ProgressBar percentage={percentage} duration={duration}/>
              <audio id="audio" ref={audioRef} src={audio.src}></audio>
            <div className='player-mute' id='player-mute-button' onClick={() => muteToggle()}></div>
            <div className='player-thumbnail-section'>
              <PlaylerThumbnail track={track}/>
            </div>
          </div>
      </>
    );
  }

  return (
    <section className='player-section'>{sessionLinks}</section>
  );
}
export default Player;