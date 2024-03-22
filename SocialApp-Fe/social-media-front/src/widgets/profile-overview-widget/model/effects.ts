import {request} from "../../../components/core/Request/request";
import {CONNECTIONS_BASE_URL, CONTENT_BASE_URL, USER_BASE_URL} from "../../../utils/constants";
import {addConnection, addPosts, addStreak, refreshProfile} from "./reducers";
import {ProfileEffectsPayload} from "./types";

export const dataRequested = async({userId, myUserId, jwtToken, dispatch}: ProfileEffectsPayload) => {
    await request({
        url: USER_BASE_URL + '/user/getSession/' + userId,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        dispatch(refreshProfile({
            userId: response.data.userId,
            profilePicture: response.data.profilePicture,
            fullName: response.data.firstName + ' ' + response.data.lastName,
            username: response.data.username,
            bio: response.data.bio,
            isPrivate: response.data.isPrivate
        }));
    }).catch((err) => console.error(err));

    await request({
        url: CONTENT_BASE_URL + '/getUserPosts/' + userId,
        method: 'GET',
        headers: {
            'Authorization' : "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(addPosts(response.data));
    }).catch((error) => {
        console.error(error);
    })

    await request({
        url: CONNECTIONS_BASE_URL + '/getUserStreak/' + userId,
        method: 'GET',
        headers: {
            Authorization : "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(addStreak(response.data));
    }).catch((error) => {
        console.error(error);
    })

    await request({
        url: CONNECTIONS_BASE_URL + '/getConnectionType/' + myUserId + '/' + userId,
        method: 'GET',
        headers: {
            Authorization : "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(addConnection(response.data));
    }).catch((error) => {
        console.error(error);
    })
}

export const followUnfollow = async({userId, myUserId, jwtToken, dispatch}: ProfileEffectsPayload) => {
    await request({
        url: CONNECTIONS_BASE_URL + '/getConnectionTypeAndUpdateConnection/' + myUserId + '/' + userId,
        method: 'POST',
        headers: {
            'Authorization' : "Bearer " + jwtToken
        }
    }).then(() => {
        dataRequested({userId, myUserId, jwtToken, dispatch});
    }).catch((error) => {
        console.error(error);
    })
}