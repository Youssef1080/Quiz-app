import React from 'react'
import './question.scss'
import { useSelector, useDispatch } from 'react-redux'
import { chosseCorrect } from '../../redux/questionSlice'
import Answer from './answer'




const Question = ({item}) => {

  const dispatch = useDispatch()

  const {data} = useSelector(state => state.questions)
  
  const answers = [...item.incorrect_answers,item.correct_answer ]


  const randomArr = answers.sort(() => Math.random() - 0.5)

  const newD =  data.map((obj, ind) => {
    return {...obj, content: randomArr[ind]}
  })
  
  const [mappedArray, setArray] = React.useState(newD)
  
  const spans = mappedArray.map((obj, ind) => {
    return <Answer 
      key={ind}
      data={obj}
      chooseFunction={()=> handleChoose(obj.id)}
      correctFunction={handleCorrect}
      correctAnswer={item.correct_answer}
    />
  })

  // console.log(item.correct_answer);
  console.log(mappedArray);

    const handleChoose = (id) => {

      setArray(prev => {
        return prev.map(answer => {
          return answer.id == id ? {...answer, value: true} : {...answer, value: false}
        })
      })

    }

    function handleCorrect() {

      setArray(prev => {
        return prev.map(answer => {
          return answer.content === item.correct_answer ? {...answer, correctAnswer: true} : {...answer, correctAnswer: false}
          //  answer.content === item.correct_answer ? console.log('yes') : console.log('no')
        })
      })
      
    } 




  return (
    <div className='question-box'>
        <h3>{item.question}</h3>
        <div className='spans' >
        {
          spans
        }
        </div>
        <hr />
    </div>
  )
}

export default Question
