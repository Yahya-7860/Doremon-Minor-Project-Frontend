import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentScore: 0,
    allScore: []
}

const scoreSlice = createSlice({
    name: "score",
    initialState,
    reducers: {
        addCurrentScore: (state, action) => {
            state.currentScore = action.payload
        },
        addAllScore: (state, action) => {
            state.allScore = state.allScore({ ...action.payload })
        }
    }
})

export const { addCurrentScore, addAllScore } = scoreSlice.actions;
export default scoreSlice.reducer;