import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/";
import axios from "axios";

const ques_URL = 'https://opentdb.com/api.php?amount=5&category=27&difficulty=hard&type=multiple'

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
    const resp = await axios.get(ques_URL)
    return resp.data
})

const initialState = {
    questions: [],
    showQuestions: false,
    data: [
        {
            id: 1,
            value: false,
            correctAnswer: false
        },
        {
            id: 2,
            value: false,
            correctAnswer: false
        },
        {
            id: 3,
            value: false,
            correctAnswer: false
        },
        {
            id: 4,
            value: false,
            correctAnswer: false
        },
    ],
    count: 0,
    showResults: false
}

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        showQuestions: (state) => {
            state.showQuestions = true
        },
        chosseCorrect: (state, action) => {
            state.data[action.payload].correctAnswer = true
        },
        increment: (state) => {
            state.count += 1
        },
        showResults: (state) => {
            state.showResults = true
        }
    },
    extraReducers: {
        [fetchQuestions.fulfilled]: (state, action) => {
            let data = action.payload.results
            let randomArr
            data.forEach((element, ind) => {
                randomArr = [...element.incorrect_answers,element.correct_answer].sort(() => Math.random() - 0.5)
                // state.data[ind].content = randomArr
            });

            state.questions = data
        },

    }
})

export default questionSlice.reducer
export const { showQuestions, chosseCorrect, increment, showResults } = questionSlice.actions 