import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from "./features/score/scoreSlice"

const store = configureStore({
    reducer: {
        score: scoreReducer
    }
})

export default store;