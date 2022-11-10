import './ProgressBar.css'
import { receiveProgClick } from '../../store/progClick'
import { useDispatch } from 'react-redux'
import { getDuration } from '../../store/duration'
import { useSelector } from 'react-redux'

function ProgressBar( {percentage, duration} ) {
    const dispatch = useDispatch()
    // const duration = useSelector(getDuration)
    
    const handleChange = (e) => {
        const click = parseFloat(e.target.value)
        dispatch(receiveProgClick({click: click/100}))
    }

    return (
        <>
        <div className='slide-container'>
            <div className='progress-bar-cover'></div>
            <div className='thumb'></div>
            <div className='current-time'>{Math.floor((percentage*duration.time) / 60) + ':' + ('0' + Math.floor((percentage*duration.time) % 60)).slice(-2)}</div>
            <input type='range' id='myinput' step='0.01' className='slider' value={percentage*100} onChange={handleChange}></input>
            <div className='duration'>{Math.floor(duration.time / 60) + ':' + ('0' + Math.floor(duration.time % 60)).slice(-2)}</div>
        </div>
        </>
    )
}
export default ProgressBar