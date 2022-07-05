import React from 'react'
import './start.scss'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { showQuestions } from '../../redux/questionSlice'

const StartPage = () => {

    const dispatch = useDispatch()

    const [willStart, setStart] = React.useState(false)
    const [begin, setBegin] = React.useState(true)

    function handleClick() {
        setStart(true)
    }

    return (
        <div className='start-page'>
            { !willStart && <div className='intro'>
                <h1>Quizzical</h1>
                <p>Some description if needed</p>
                <button onClick={handleClick}>Start quiz</button>
            </div>}
            { willStart && begin &&
                <div className='start-close'>
                    <p>this quiz contains 5 questions and you should answer them in less than ten minutes</p>
                    <button className='start-btn' onClick={() => {
                        setBegin(false)
                        dispatch(showQuestions())
                    }} 
                    
                    >Start</button>
                    <button className='close-btn' onClick={() => setStart(false)}>Close</button>
                </div>
            }
        </div>
    )
}

export default StartPage