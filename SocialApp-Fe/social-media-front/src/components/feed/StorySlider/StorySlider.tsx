// StorySlider.tsx

import React, {useEffect, useState} from "react";
import {StoryType} from "../../../types/auth";
import Story from "../../core/Story/Story";
import SimpleModal from "./SimpleModal";
import {sessionSelect} from "../../../redux/core/session/selectors";
import {useSelector} from "react-redux";

// Assuming User has these basic properties, adjust according to your actual User model
interface User {
    userId: string;
    username: string;
}

interface GroupedStories {
    user: User;
    stories: StoryType[];
}

interface StorySliderProps {
    stories: GroupedStories[];
}

const StorySlider: React.FC<StorySliderProps> = ({ stories }) => {
    const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
    const profilePicture = useSelector(sessionSelect.profilePicture);
    const selectedUserId = selectedUserIndex !== null ? stories[selectedUserIndex].user.userId : null;

    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const darkModeSetting = localStorage.getItem('hasDarkMode') === 'true';
        setIsDarkMode(darkModeSetting);
    }, []);


    const handleUserClick = (userIndex: number) => {
        setSelectedUserIndex(userIndex);
        setSelectedStoryIndex(0);
    };

    const handleCloseModal = () => {
        setSelectedUserIndex(null);
        setSelectedStoryIndex(null);
    };

    const handlePrevStory = () => {
        if (selectedUserIndex !== null && selectedStoryIndex !== null) {
            if (selectedStoryIndex > 0) {
                // @ts-ignore
                setSelectedStoryIndex(prevIndex => prevIndex - 1);
            } else {
                if (selectedUserIndex > 0) {
                    // @ts-ignore
                    setSelectedUserIndex(prevIndex => prevIndex - 1);
                    setSelectedStoryIndex(stories[selectedUserIndex - 1].stories.length - 1);
                }
            }
        }
    };


    const handleNextStory = () => {
        if (selectedUserIndex !== null && selectedStoryIndex !== null) {
            const currentMaxIndex = stories[selectedUserIndex].stories.length - 1;

            if (selectedStoryIndex < currentMaxIndex) {
                // @ts-ignore
                setSelectedStoryIndex(prevIndex => prevIndex + 1);
            } else {
                if (selectedUserIndex < stories.length - 1) {
                    // @ts-ignore
                    setSelectedUserIndex(prevIndex => prevIndex + 1);
                    setSelectedStoryIndex(0);
                }
            }
        }
    };


    return (
        <>
            <div className={`story-slider ${isDarkMode ? 'dark-mode' : ''}`}
                 style={{
                     width: '100%',
                     display: 'flex',
                     flexDirection: 'row',
                     left: 0,
                     gap: 10,
                     padding: 10
                 }}>
                {stories.map((userStories, index) => (
                    <div onClick={() => handleUserClick(index)} key={userStories.user.userId}>
                        <Story {...userStories.stories[0]} />
                    </div>
                ))}
            </div>
            {selectedUserIndex !== null && selectedStoryIndex !== null && (
                <SimpleModal
                    isOpen={true}
                    // @ts-ignore
                    userId={selectedUserId}
                    handleClose={handleCloseModal}
                    handlePrev={handlePrevStory}
                    handleNext={handleNextStory}
                    username={stories[selectedUserIndex].user.username}
                    profilePicture={profilePicture}
                    isDarkMode={isDarkMode}
                >
                    <img src={stories[selectedUserIndex].stories[selectedStoryIndex].photo} alt="Story" />
                </SimpleModal>
            )}
        </>
    );
};

export default StorySlider;
