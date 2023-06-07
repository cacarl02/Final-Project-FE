import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const TopUpForm = (props) => {
    const { loginToken, setUserData, settingsData, setTopUpFormPopup } = props
    const [addbalance, setAddBalance] = useState('')
    const [fetchedMessage, setFetchedMessage] = useState('')
    const patchBalance = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch (`https://final-project-app.onrender.com/users/${settingsData.id}/topup_balance`, {
                method : "PATCH",
                headers : {
                    "Content-type": "application/json",
                    "Authorization" : `${loginToken}`
                },
                body: JSON.stringify({
                    amount: addbalance
                })
            })
            const data = await response.json()
            setFetchedMessage(data.message ? data.message : data.error)
            setTopUpFormPopup(data.error ? true : false)
            setUserData(data.user)
        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
            <form onSubmit={patchBalance} className='p-10 bg-gray-50 dark:bg-gray-700 m-5 rounded-lg shadow text-white relative'>
                <button 
                    type='button'
                    onClick={() => setTopUpFormPopup(false)}
                    className='absolute top-2 right-2 text-2xl hover:text-gray-400'><AiOutlineClose /></button>
                <div className='flex flex-col'>
                    <span>Top-up amount:</span>
                    <input
                        type='number'
                        step="0.01"
                        value={addbalance}
                        onChange={(e) => setAddBalance(e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                    <button type="submit" className='w-full mt-4 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Top-up</button>
                </div>
            </form>
        </div>
    )
}

export default TopUpForm