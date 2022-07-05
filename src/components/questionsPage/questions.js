import React from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { fetchQuestions, showResults } from '../../redux/questionSlice'
import Question from '../question/question'
import { nanoid } from '@reduxjs/toolkit'
import './questions.scss'


const Questions = () => {
    const dispatch = useDispatch()

    React.useEffect(_ => {
        dispatch(fetchQuestions())
    },[])

    const { showQuestions, questions } = useSelector( state => state.questions)


    return (
        showQuestions &&
        <div className='questions'>
            {
                questions.map(item => 
                    <Question 
                        key={nanoid()}
                        item={item}
                    />
                    )
            }
            <button className='check' onClick={() => dispatch(showResults())}>Check Answers</button>
        </div>
    )
}

export default Questions