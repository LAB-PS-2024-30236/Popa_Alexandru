import {PostProps, StoryProps} from "./types";
import {request} from "../../../components/core/Request/request";
import {CONTENT_BASE_URL} from "../../../utils/constants";
import {createPostFailed, createPostSucces} from "./reducers";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;



export const createPost = async ({userId,photo,datePosted,description, dispatch}: PostProps) =>{
    await request({
        url: CONTENT_BASE_URL + '/addPost',
        method:'POST',
        data: {userId, photo, datePosted, description}
    }).then((response)=>{
        dispatch(createPostSucces());
    }).catch((error)=>
    dispatch(createPostFailed(error.message)))
}

export const createStory = async ({userId, photo, datePosted,dispatch}:StoryProps ) =>{
    await request({
        url: CONTENT_BASE_URL+ '/addStory',
        method: 'POST',
        data: {userId, photo, datePosted}
    }).then(()=>{
        dispatch(createPostSucces());
    }).catch((error) =>
    dispatch(createPostFailed(error.message)))
}