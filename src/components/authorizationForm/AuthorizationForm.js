import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './authorizationForm.scss';
import RegistrationForm from "../registrationForm/RegistrationForm";

const AuthorizationForm = () => {

    const [login, setLogin] = useState('');
    const [check, setCheck] = useState(true);
    let navigate = useNavigate();

    function checkLogin(event) {
        event.preventDefault();
        const oldLogin = localStorage.getItem('login');
        if (oldLogin === login) {
            setCheck(true);
            navigate('/desc')
        } else {
            setCheck(false);
        }
    }

    function onChange() {
        setCheck(false);
    }



    const content = !check ? <RegistrationForm/> :
        <form className="authorizationForm">
            <h2>Sign in</h2>
            <ul className="authorizationForm__wrapper">
                <li className="authorizationForm__item">
                    <label htmlFor="login">Login</label>
                    <input 
                        type="text"
                        id='login'
                        value={login}
                        onChange={(e) => setLogin(e.target.value)} />
                </li>
                <li className="authorizationForm__item">
                    <button 
                        className="btn"
                        onClick={onChange}>Create Account</button>
                    <button 
                        className="btn"
                        onClick={checkLogin}>Sign in</button>
                </li>
            </ul>
        </form>


    return (
        <>
            {content}
        </>
    )
}

export default AuthorizationForm;