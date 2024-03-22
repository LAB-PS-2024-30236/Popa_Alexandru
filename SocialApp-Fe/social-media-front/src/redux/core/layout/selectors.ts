import {RootState} from "../../store";

export const layoutSelect = ({
    showSidebar: (state: RootState) => state.layout.showSidebar,
    isDark: (state: RootState) => state.layout.isDark
});