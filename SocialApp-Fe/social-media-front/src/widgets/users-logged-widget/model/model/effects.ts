import {UserLoggedPayload} from "./types";
import {request} from "../../../../components/core/Request/request";
import {USER_BASE_URL} from "../../../../utils/constants";
import {usersLoggedSucces} from "./reducers";


export const dataRequested = async ({jwtToken, dispatch}: UserLoggedPayload)=>{
    await request(
        {
            url: USER_BASE_URL +'/getLoggedUsers',
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + jwtToken
            }
        }
    ).then((response)=>{
        dispatch(usersLoggedSucces(response.data));
    }).catch((error)=>{
        console.error(error);
    })
}