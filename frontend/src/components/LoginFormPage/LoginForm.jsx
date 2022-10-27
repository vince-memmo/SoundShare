import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, receiveUser, removeUser } from "../../store/sessionReducer"
import { Redirect } from 'react-router-dom';

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

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
    
    return (
        <>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text"  placeholder="username" value={credential} onChange={(e) => setCredential(e.target.value)}/>
                <input type="password"  placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value="Log In" />
            </form>
        </>
    )
    
}

export default LoginForm