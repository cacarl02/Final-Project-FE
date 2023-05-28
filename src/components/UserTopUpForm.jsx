import React, { useState } from 'react'

const TopUpForm = (props) => {
    const { loginToken, settingsData, setTopUpFormPopup } = props
    const [addbalance, setAddBalance] = useState('')
    const [fetchedMessage, setFetchedMessage] = useState('')
    const patchBalance = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch (`http://localhost:3001/users/${settingsData.id}/topup_balance`, {
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
        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <form onSubmit={patchBalance}>
            <div>
                <span>Top-up amount:</span>
                <input
                    type='number'
                    value={addbalance}
                    onChange={(e) => setAddBalance(e.target.value)}
                />
                <button type="submit">Top-up</button>
            </div>
        </form>
    )
}

export default TopUpForm