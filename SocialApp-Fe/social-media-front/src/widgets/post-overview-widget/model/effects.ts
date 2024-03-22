import {request} from "../../../components/core/Request/request";
import {CONTENT_BASE_URL} from "../../../utils/constants";
import {EffectsPayload} from "./types";
import {addComments} from "./reducers";

export const dataRequested = async({ postId, jwtToken, dispatch }: EffectsPayload) => {
    await request({
        url: CONTENT_BASE_URL + '/getPostComments/' + postId,
        method: 'GET',
        headers: {
            'Authorization' : "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(addComments(response.data));
    }).catch((error) => {
        console.error(error);
    })
}