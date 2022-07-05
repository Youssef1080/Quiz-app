import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../redux/questionSlice'
import './answer.scss'

const Answer = ({data, ...otherProps}) => {
    const dispatch = useDispatch()

    const {count} = useSelector(state => state.questions)
    const {showResults} = useSelector(state => state.questions)

    React.useEffect(_ => {
        if (data.value == true && data.correctAnswer == true) {
            dispatch(increment())
        }
    }, [])


    const [isWrong, setWrong] = React.useState(false)

    const spanStyle = {
        border: data.value && 'none' ,
        backgroundColor: data.value && '#D6DBF5' 
        
    }





    // React.useEffect(_ => {
        if (data.value == true && data.correctAnswer == false) {
            console.log('true');
            // setWrong(true)
        }
    // }, [])


    return (
        <span 
            onClick={() => {
                otherProps.chooseFunction()
                otherProps.correctFunction()
            } } 
            className= {`${showResults && data.correctAnswer && 'correct'} ${showResults && isWrong && 'wrong'}`}
            style={spanStyle}
        >
            {data.content}
        </span>
    )
}

export default Answer