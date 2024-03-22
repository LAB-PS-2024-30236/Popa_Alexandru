import {User} from "./user";


export interface StoryType {
    storyId: string;
    user: User;
    photo: string;
    datePosted: string;
}
