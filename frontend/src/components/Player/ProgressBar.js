import './ProgressBar.css'
import { receiveProgClick } from '../../store/progClick'
import { useDispatch } from 'react-redux'
import { getQueue, receiveQueue } from '../../store/queue'
import { useSelector } from 'react-redux'

function ProgressBar( {percentage} ) {
    const dispatch = useDispatch()
    
    const handleChange = (e) => {
        const click = parseFloat(e.target.value)
        dispatch(receiveProgClick({click: click/100}))
    }

    return (
        <>
        <div className='slide-container'>
            <div className='progress-bar-cover'></div>
            <div className='thumb'></div>
            <input type='range' step='0.01' className='range' value={percentage*100} onChange={handleChange}></input>
        </div>
        </>
    )
}
export default ProgressBar