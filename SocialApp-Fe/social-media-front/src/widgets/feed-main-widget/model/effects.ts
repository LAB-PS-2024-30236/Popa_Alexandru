import {request} from "../../../components/core/Request/request";
import {CONNECTIONS_BASE_URL, CONTENT_BASE_URL} from "../../../utils/constants";
import {
    feedPostsSuccess,
    feedStoriesSuccess,
    suggestedFriendsSuccess,
    suggestedPostsSuccess
} from "./reducers";
import {EffectsPayload} from "./types";

export const dataRequested = async ({ userId, jwtToken, dispatch}: EffectsPayload) => {
    await request({
        url: CONTENT_BASE_URL + '/getFeedPosts/' + userId,
        method: 'GET',
        headers: {
            'Authorization' : "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(feedPostsSuccess(response.data));
    }).catch((error) => {
        console.error(error);
    })

    await request({
        url: CONTENT_BASE_URL + '/getFeedStories/' + userId,
        method: 'GET',
        headers: {
            Authorization : "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(feedStoriesSuccess(response.data));
    }).catch((error) => {
        console.error(error);
    })

    await request({
        url: CONTENT_BASE_URL + '/getSuggestedPosts/' + userId,
        method: 'GET',
        headers: {
            Authorization : "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(suggestedPostsSuccess(response.data));
    }).catch((error) => {
        console.error(error);
    })

    await request({
        url: CONNECTIONS_BASE_URL + '/getSuggestedFriends/' + userId,
        method: 'GET',
        headers: {
            Authorization : "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(suggestedFriendsSuccess(response.data));
    }).catch((error) => {
        console.error(error);
    })
}