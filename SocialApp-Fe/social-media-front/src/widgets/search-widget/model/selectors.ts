import {RootState} from "../../../redux/store";

export const searchSelect = ({
    searchResult: (state: RootState) => state.search.searchResult
});