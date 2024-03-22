import {USER_BASE_URL} from "../../../utils/constants";
import {loginFailure, loginSuccess} from "./reducers";
import {getSessionState, LoginProps} from "./types";
import {request} from "../../../components/core/Request/request";
import {continueSession, startSession} from "../../../redux/core/session/reducers";
import {showSidebar} from "../../../redux/core/layout/reducers";

export const login = async ({username, password, dispatch}: LoginProps) => {
    await request({
        url: USER_BASE_URL + '/login',
        method: 'POST',
        data: {username, password}
    }).then((response) => {
        dispatch(loginSuccess());
        dispatch(startSession(response.data));
    }).catch((error) => {
        dispatch(loginFailure(error.message));
    })
}

export const getSession = async ({ userId, dispatch }: getSessionState) => {
    await request({
        url: USER_BASE_URL + '/user/getSession/' + userId,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        dispatch(continueSession(response.data))
        dispatch(loginSuccess());
        dispatch(showSidebar());
    }).catch((err) => {
        console.error(err);
    })
}