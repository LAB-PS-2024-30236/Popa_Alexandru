import {createSlice} from "@reduxjs/toolkit";
import {defaultLayout} from "./defaultState";

const layoutSlice = createSlice({
    name: 'layoutState',
    initialState: defaultLayout,
    reducers: {
        closeSidebar: (state) => {
            state.showSidebar = false;
        },
        showSidebar: (state) => {
            state.showSidebar = true;
        }
    }
});

export const { closeSidebar, showSidebar } = layoutSlice.actions;
export default layoutSlice.reducer;