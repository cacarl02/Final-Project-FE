import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Login = (props) => {
    const { isLoggedIn, setIsLoggedIn, setLoginToken, setUserData} = props
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try{
            const response = await fetch('http://localhost:3001/login', {
                method : "POST",
                headers : {
                    "Content-type": "application/json"
                },
                body : JSON.stringify({ user: {email: loginEmail, password: loginPassword}})
            })
            const loginData = await response.json();
            const loginHeader = response.headers;
            const authorization = loginHeader.get('Authorization');
            setLoginError(loginData.error ? loginData.error : '')
            
            setUserData(loginData.data ? loginData.data : '')
            
            if(loginData.status.code === 200) {
                setLoginToken(loginHeader.authorization)
                setIsLoggedIn(true)
            }

            if(loginHeader) {
                setLoginToken(authorization)
            }
            
        }
        catch(error){
            console.error(error)
        }
    }
    return (
        <div>
            <div>Para PH</div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        className=''
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder='Email'
                        value={loginEmail}
                        type='email' 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        className=''
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder='Password'
                        value={loginPassword}
                        type='password'
                    />
                </div>
                <span>{loginError}</span>
                <button onClick={handleSubmit} className=''>Login</button>
            </form>
            <div>
                <span>Don't have an account yet?</span>
                <Link to='/signup'>Signup now!</Link>
            </div>
        </div>
    )
}

export default Login;