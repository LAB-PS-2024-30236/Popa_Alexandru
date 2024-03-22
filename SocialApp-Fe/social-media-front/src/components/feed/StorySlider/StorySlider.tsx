import React from "react";
import {StoryType} from "../../../types/auth";
import Story from "../../core/Story/Story";

interface StorySliderProps {
    stories: StoryType[];
}

const StorySlider: React.FC<StorySliderProps> = ({ stories }) => {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            left: 0,
            gap: 10,
            padding: 10}}>
            {stories.map(story => {
                return (
                    <Story {...story} key={story.storyId}/>
                )
            })}
        </div>
    )
};

export default StorySlider;