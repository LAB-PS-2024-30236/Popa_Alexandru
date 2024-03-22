import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import BText from "../../components/core/BText/BText";
import {BACKGROUND_LIGHT, PRIMARY_LIGHT} from "../../utils/constants";
import Button from "../../components/core/Button/Button";
import LText from "../../components/core/LText/LText";
import Line from "../../components/core/Line/Line";
import Credits from "../../components/core/Credits/Credits";
import {register} from "./model/effects";
import {showSidebar} from "../../redux/core/layout/reducers";
import {getSession} from "../auth-login-widget/model/effects";
import {sessionSelect} from "../../redux/core/session/selectors";
import {registrationSuccess} from "../auth-login-widget/model/reducers";
import {authSelect} from "../auth-login-widget/model/selectors";

const AuthRegistrationWidget: React.FC = () => {
    const errorMessage = useSelector(authSelect.authError);
    const isLogged = useSelector(authSelect.isLogged);
    const userId = useSelector(sessionSelect.userId);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [birthdate, setBirthdate] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<number>(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLogged || errorMessage === 'NO-ERROR') {
            dispatch(registrationSuccess());
            navigate('/home');
            dispatch(showSidebar);
        }
        if(userId !== '') {
            getSession({userId, dispatch});
        }
    }, [dispatch, errorMessage, navigate]);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
    const handleBirthdateChange = (event: React.ChangeEvent<HTMLInputElement>) => setBirthdate(event.target.value);
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setFullName(event.target.value);
    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(event.target.valueAsNumber);
    const handleSubmit = async() => {
        await register({
            email, username, password, fullName, phoneNumber, birthdate, dispatch
        });
    }

    return (
        <div className="auth-back">
            <div className="auth-page-container">
                <p className="auth-title">Create your Account</p>
                <Credits color={BACKGROUND_LIGHT}/>
            </div>
            <div className="auth-container">
                <p className="auth-logo">yolo</p>
                <div className="auth-forms">
                    <input
                        className="auth-form"
                        placeholder="Full name"
                        type='text'
                        onChange={handleFullNameChange}/>
                    <input
                        className="auth-form"
                        placeholder="Email"
                        type='email'
                        onChange={handleEmailChange}/>
                    <input
                        className="auth-form"
                        placeholder="Birthdate"
                        type='date'
                        onChange={handleBirthdateChange}/>
                    <input
                        className="auth-form"
                        placeholder="Phone number"
                        type='number'
                        onChange={handlePhoneNumberChange}/>
                    <input
                        className="auth-form"
                        placeholder="Username"
                        type='text'
                        onChange={handleUsernameChange}/>
                    <input
                        className="auth-form"
                        placeholder="Password"
                        type='password'
                        onChange={handlePasswordChange}/>
                </div>
                <Button content='Sign up' onClick={handleSubmit}/>
                {errorMessage && errorMessage !== 'NO-ERROR' && <LText text={errorMessage} color={'#ff0000'}/>}
                <Line/>
                <div className="auth-under">
                    <LText text="Already have an account?"/>
                    <Link to='/login' className='link-btn'>
                        <BText text="Log in" color={PRIMARY_LIGHT} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AuthRegistrationWidget;