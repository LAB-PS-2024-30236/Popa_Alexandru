import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultSearchResult} from "./defaultState";
import {SearchResult} from "./types";


const searchSlice = createSlice(
    {
        name: 'searchSlice',
        initialState: defaultSearchResult,
        reducers: {
            searchResultSucces: (state, action: PayloadAction<SearchResult>) => {
                console.log("you got here");
                state.searchResult = action.payload.searchResult
            }

        }
    }
);

export const {searchResultSucces} = searchSlice.actions;

export default searchSlice.reducer;