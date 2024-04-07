import { request } from "../../../components/core/Request/request";
import { CONNECTIONS_BASE_URL, CONTENT_BASE_URL } from "../../../utils/constants";
import {
    feedPostsSuccess,
    feedStoriesSuccess,
    suggestedFriendsSuccess,
    suggestedPostsSuccess,
    feedRandomPostsSuccess,
} from "./reducers";
import { EffectsPayload } from "./types";

// Helper function for retrying requests on empty response
// @ts-ignore
async function fetchWithRetryOnEmpty({url, method, headers, dispatch, successAction, maxRetries = 3, currentAttempt = 0}) {
    try {
        const response = await request({ url, method, headers });
        if (response.data.length === 0 && currentAttempt < maxRetries) {
            console.log(`Empty response received, retrying attempt ${currentAttempt + 1}...`);
            await fetchWithRetryOnEmpty({url, method, headers, dispatch, successAction, maxRetries, currentAttempt: currentAttempt + 1});
        } else {
            dispatch(successAction(response.data));
        }
    } catch (error) {
        console.error(error);
    }
}

export const dataRequested = async ({ userId, jwtToken, dispatch }: EffectsPayload) => {
    await request({
        url: CONTENT_BASE_URL + '/getFeedPosts/' + userId,
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(feedPostsSuccess(response.data));
    }).catch((error) => {
        console.error(error);
    });

    // Use the helper function for fetching random posts
    await fetchWithRetryOnEmpty({
        url: CONTENT_BASE_URL + '/getRandomPosts/' + userId,
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + jwtToken
        },
        dispatch,
        successAction: feedRandomPostsSuccess
    });

    // Other requests remain unchanged
    await request({
        url: CONTENT_BASE_URL + '/getFeedStories/' + userId,
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(feedStoriesSuccess(response.data));
    }).catch((error) => {
        console.error(error);
    });

    await request({
        url: CONTENT_BASE_URL + '/getSuggestedPosts/' + userId,
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(suggestedPostsSuccess(response.data));
    }).catch((error) => {
        console.error(error);
    });

    await request({
        url: CONNECTIONS_BASE_URL + '/getSuggestedFriends/' + userId,
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(suggestedFriendsSuccess(response.data));
    }).catch((error) => {
        console.error(error);
    });
};
