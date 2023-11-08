// @ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import cellsReducer from './CellsSlice';
import bundlerReducer from "./BundlerSlice"

const store = configureStore({
    reducer:{
        cells: cellsReducer,
        bundler: bundlerReducer,
        auth:authReducer
    }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch