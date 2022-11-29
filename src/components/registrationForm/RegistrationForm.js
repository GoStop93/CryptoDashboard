import { useState } from "react";
import './registrationForm.scss'
import AuthorizationForm from "../authorizationForm/AuthorizationForm";


const RegistrationForm = () => {

    const [name, setName] = useState([]);
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [reg, setReg] = useState(false);


    function handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('name', name);
        localStorage.setItem('surname', surname);
        localStorage.setItem('email', email);
        localStorage.setItem('login', login);
        if (name && surname && email && login) {
            setReg(true);
        }
    }

    function onChange () {
        setReg(true);
    }

    const content = reg ? <AuthorizationForm/> : 
    <form className="registrationForm">
    <h2>Create Account</h2>
    <ul className="registrationForm__wrapper">
        <li className="registrationForm__item">
            <label htmlFor="name">Name</label>
            <input 
                type="text"
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)} />
        </li>
        <li className="registrationForm__item">
            <label htmlFor="surname">Surname</label>
            <input 
                type="text"
                id='surname'
                value={surname}
                onChange={(e) => setSurname(e.target.value)} />
        </li>
        <li className="registrationForm__item">
            <label htmlFor="email">E-mail</label>
            <input 
                type="email"
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
        </li>
        <li className="registrationForm__item">
            <label htmlFor="login">Login</label>
            <input 
                type="text"
                id='login'
                value={login}
                onChange={(e) => setLogin(e.target.value)} />
        </li>
        <li className="registrationForm__item">
            <button 
                className="btn"
                onClick={onChange}>Back to Sign In</button>
            <button 
                className="btn"
                onClick={handleSubmit}>Create Account</button>
        </li>
    </ul>
</form>

    return (
        <>
            {content}
        </>
    )
}

export default RegistrationForm;