import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTrack } from '../../store/tracks';

const TrackIndexItem = ({track}) => {
    
    const dispatch = useDispatch()

    return (
        <>
        <li>
            <h3>{track.name}</h3>
            <img src={track.photoUrl}/>
            <button onClick={() => dispatch(deleteTrack(track.id))}>Delete</button>
        </li>
        </>
    )
}

export default TrackIndexItem