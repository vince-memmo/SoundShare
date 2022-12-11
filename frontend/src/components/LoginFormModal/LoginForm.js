import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, receiveUser, removeUser } from "../../store/sessionReducer"
import { Redirect } from 'react-router-dom';
import './LoginForm.css';


const LoginForm = (props) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        dispatch(login({ credential, password }))
        .catch(async (res) => {
            let data;
            try {
              data = await res.clone().json();
            } catch {
              data = await res.text(); 
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          });
    }

    const handleDemoSubmit = (e) => {
        e.preventDefault()
        const credential = 'Demo-lition'
        const password = 'password'
        setErrors([])
        dispatch(login({ credential, password }))
        .catch(async (res) => {
            let data;
            try {
              data = await res.clone().json();
            } catch {
              data = await res.text(); 
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          });
    }
    
    return (
        <>
        <div className="login-div">
            <div className="welcome-back">Welcome Back!</div>
            <form onSubmit={handleSubmit} className="login-form">
                <input type="text"  placeholder="Your Username" value={credential} onChange={(e) => setCredential(e.target.value)}/>
                <input type="password"  placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <ul>
                    {errors.map(error => <li className="login-errors" key={error}>{error}</li>)}
                </ul>
                <input className="login-button-2" type="submit" value="Log In" />
            </form>
            <div onClick={handleDemoSubmit} className="demo-login-form">Demo Login</div>
        </div>
        </>
    )
    
}

export default LoginForm