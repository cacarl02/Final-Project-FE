import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmationError, setSignupPasswordConfirmationError] = useState("");

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await fetch('https://final-project-app.onrender.com/signup', {
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
                navigate('/')
            }
        }
        catch(error){
            console.error(error)
        }
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Signup</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                                <input
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    placeholder='Email'
                                    value={signupEmail}
                                    type='email' 
                                />
                            </div>
                            <span className='text-red-500'>{emailError}</span>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                                <input
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    placeholder='Password'
                                    value={signupPassword}
                                    type='password'
                                />
                            </div>
                            <span className='text-red-600'>{passwordError}</span>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Confirmation:</label>
                                <input
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    placeholder='Confirm Password'
                                    value={passwordConfirmation}
                                    type='password'
                                />
                            </div>
                            <span className='text-red-500'>{passwordConfirmationError}</span>
                            <button type="submit" className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Signup</button>
                        </form>
                        <div>
                            <Link to='/' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Return to Login</Link>  
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup;