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
            const response = await fetch('https://para-app-fe.onrender.com/login', {
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
                setLoginToken(authorization)
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
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Para PH</div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                                <input
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    placeholder='Email'
                                    value={loginEmail}
                                    type='email' 
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                                <input
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    placeholder='Password'
                                    value={loginPassword}
                                    type='password'
                                />
                            </div>
                            <span className="text-red-600">{loginError}</span>
                            <button type="submit" className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Login</button>
                        </form>
                        <div>
                            <span className="text-sm font-light text-gray-500 dark:text-gray-400">No account yet?</span>
                            <Link to='/signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup now!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;