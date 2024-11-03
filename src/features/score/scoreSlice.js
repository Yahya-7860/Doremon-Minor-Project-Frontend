import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentScore: 0,
    maxScore: 0,
    allScore: [],
    username: '',
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
        addUsername: (state, action) => {
            state.username = action.payload.playerName
        },
    }
})

export const { addCurrentScore, addAllScore, addMaxScore, addUsername, changeIsAuthenticated } = scoreSlice.actions;
export default scoreSlice.reducer;