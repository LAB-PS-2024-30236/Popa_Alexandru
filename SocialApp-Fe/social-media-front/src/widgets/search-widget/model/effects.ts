import {SearchPayload} from "./types";
import {request} from "../../../components/core/Request/request";
import {searchResultSucces} from "./reducers";

export const dataRequested = async ({username, dispatch}: SearchPayload) => {
    await request(
        {
            url: 'http://localhost:8081/api/search/users',
            method: 'GET',
            params: {
                'username': username
            }
        }
    ).then((response) => {
        console.log("you got here");
        dispatch(searchResultSucces({ searchResult: response.data }));
    }).catch((error) => {
        console.error(error);
    })
}