import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentScore: 0,
    maxScore: 0,
    allScore: [],
}

const scoreSlice = createSlice({
    name: "score",
    initialState,
    reducers: {
        addCurrentScore: (state, action) => {
            state.currentScore = action.payload.score
        },
        addMaxScore: (state, action) => {
            state.maxScore = action.payload.maxScore
        },
        addAllScore: (state, action) => {
            state.allScore = state.allScore({ ...action.payload })
        },
    }
})

export const { addCurrentScore, addAllScore, addMaxScore } = scoreSlice.actions;
export default scoreSlice.reducer;