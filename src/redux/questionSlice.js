import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/";
import axios from "axios";

const ques_URL = "https://opentdb.com";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (url) => {
    const resp = await axios.get(`${ques_URL}${url}`);
    return resp.data;
  }
);

export const fetchLbn = createAsyncThunk("questions/fetchLbn", async (url) => {
  const resp = await axios.get(`${ques_URL}${url}`);
  return resp.data;
});

const initialState = {
  questions: [],
  showQuestions: false,
  count: 0,
  showResults: false,
  category: [],
  url: "",
  mappedArray: [],
  data: []
};

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    showQuestions: (state) => {
      state.showQuestions = true;
    },
    chosseCorrect: (state, action) => {
      state.data[action.payload].correctAnswer = true;
    },
    increment: (state) => {
      state.count += 1;
    },
    showResults: (state) => {
      state.showResults = true;
    },
    getUrl: (state, action) => {
      state.url = action.payload;
    }
  },
  extraReducers: {
    [fetchQuestions.fulfilled]: (state, action) => {
      state.category = action.payload;
    },
    [fetchLbn.fulfilled]: (state, action) => {
      state.mappedArray = action.payload.results;
      console.log(state.mappedArray);
      state.mappedArray?.forEach((item, ind) => {
        const arr = [...item.incorrect_answers, item.correct_answer];
        arr.sort(() => 0.5 - Math.random());

        item.data = arr;
      });
    }
  }
});

export default questionSlice.reducer;
export const { showQuestions, chosseCorrect, increment, showResults, getUrl } =
  questionSlice.actions;
