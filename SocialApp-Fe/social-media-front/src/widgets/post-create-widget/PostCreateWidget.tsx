import React, {useState, useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { createPost, createStory } from "./model/effects";
import { sessionSelect } from "../../redux/core/session/selectors";
import './PostCreateWidget.css';
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const PostCreateWidget: React.FC = () => {
    const userId = useSelector(sessionSelect.userId);
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const datePosted = new Date().toISOString().split('T')[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeSetting = localStorage.getItem('hasDarkMode') === 'true';
        setIsDarkMode(darkModeSetting);
    }, []);

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            setFile(files[0]);
            setPreview(URL.createObjectURL(files[0]));
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const uploadImage = async () => {
        if (file) {
            const imageRef = ref(storage, `images/${userId}_${file.name}_${uuidv4()}`);
            try {
                const snapshot = await uploadBytes(imageRef, file);
                return await getDownloadURL(snapshot.ref);
            } catch (error) {
                alert("Failed to upload image: " + error);
                throw error;
            }
        }
        throw new Error("No file selected");
    };

    const handleSubmit = async (action: 'post' | 'story' | 'both') => {
        try {
            if (file) {
                const photoURL = await uploadImage();
                if (action === 'post' || action === 'both') {
                    await createPost({
                        userId, photo: photoURL, datePosted, description, dispatch
                    });
                }
                if (action === 'story' || action === 'both') {
                    await createStory({
                        userId, photo: photoURL, datePosted, dispatch
                    });
                }

                navigate("/home");
            } else {
                alert("Please select a file to upload.");
            }
        } catch (error) {
            console.error("Failed to create post or story:", error);
            alert(error);
        }
    };

    return (
        <div className={`widget-main-create ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className='upload-section'>
                <div className='image-upload-container' onClick={handleClick}>
                    {preview ? (
                        <img src={preview} alt="preview" className="image-preview" />
                    ) : (
                        <div className="upload-placeholder">Upload Image</div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}/>
                </div>
                <div className='description-section'>
                    <input
                        className="description-input"
                        placeholder="Description"
                        type='text'
                        onChange={handleDescriptionChange}/>
                </div>
                <div className='button-section'>
                    <Button className={`create-post-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={() => handleSubmit('post')}>Add as Post</Button>
                    <Button className={`create-post-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={() => handleSubmit('story')}>Add as Story</Button>
                    <Button className={`create-post-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={() => handleSubmit('both')}>Add</Button>
                </div>
            </div>
        </div>
    );
}

export default PostCreateWidget;
