import { useState } from 'react';
import { Link } from 'react-router-dom'

const Signup = () => {
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmationError, setSignupPasswordConfirmationError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await fetch('http://localhost:3001/signup', {
                method : "POST",
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({ user: {email: signupEmail, password: signupPassword, password_confirmation: passwordConfirmation}})
            })
            const signupData = await response.json()

            setEmailError(signupData.email ? signupData.email : '')
            setPasswordError(signupData.password ? signupData.password : '')
            setSignupPasswordConfirmationError(signupData.password_confirmation ? signupData.password_confirmation : '')

            if(signupData.data) {

            }
        }
        catch(error){
            console.error(error)
        }
    }
    return (
        <>
            <div>
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        className=''
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder='Email'
                        value={signupEmail}
                        type='email' 
                    />
                </div>
                <span>{emailError}</span>
                <div>
                    <label>Password:</label>
                    <input
                        className=''
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder='Password'
                        value={signupPassword}
                        type='password'
                    />
                </div>
                <span>{passwordError}</span>
                <div>
                    <label>Password Confirmation:</label>
                    <input
                        className=''
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder='Confirm Password'
                        value={passwordConfirmation}
                        type='password'
                    />
                </div>
                <span>{passwordConfirmationError}</span>
                <button type="submit" className=''>Signup</button>
            </form>
            </div>
            <Link to='/'>Return to Login</Link>
        </>
    )
}

export default Signup;