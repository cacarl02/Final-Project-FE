import { useEffect, useState } from "react";


const History = (props) => {
    const { loginToken, userData } = props
    const [historyList, setHistoryList] = useState([])
    
    const fetchHistory = async() => {

        var url = ''

        if(userData.role === 'operator') {
            url = `https://final-project-app.onrender.com/trips/${userData.id}/history`
        }
        if(userData.role === 'commuter') {
            url = `https://final-project-app.onrender.com/bookings/${userData.id}/history`
        }
        try{
            const response = await fetch (url, {
                method : "GET",
                headers : {
                    "Content-type": "application/json",
                    "Authorization": `${loginToken}`
                }
            })
            const historyData = await response.json()
            setHistoryList(historyData)
        }
        catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        fetchHistory()
    }, [loginToken])

    const format = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC', timeZoneOffset: 480}
    const RenderHistory = () => {
        return(
            <div className="h-4/5 overflow-y-scroll overflow-hidden text-gray-300">
                {
                    userData.role === 'operator' && historyList && historyList.length ? historyList.map((obj) => (
                        <div key={obj.id} className="p-4 bg-gray-50 dark:bg-gray-700 mx-5 rounded-lg shadow m-4 grid grid-cols-2 text-center">
                            <div>{obj.start.charAt(0).toUpperCase() + obj.start.slice(1)} to {obj.end.charAt(0).toUpperCase() + obj.end.slice(1)}</div>
                            <div>{new Date(obj.updated_at).toLocaleString()}</div>
                            <div>Departure: {new Date(obj.departure).toLocaleDateString([], format)}</div>
                            <div>Total Passengers: {obj.total_passengers}</div>
                            <div>Total Amount: {obj.total_amount}</div>
                            <div>Status: <span className={`Status ${obj.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>{obj.status.charAt(0).toUpperCase() + obj.status.slice(1)}</span></div>
                        </div>
                    ))
                    : userData.role === 'commuter' && historyList && historyList.length ? historyList.map((obj) => (
                        <div key={obj.id} className="p-4 bg-gray-50 dark:bg-gray-700 mx-5 rounded-lg shadow m-4 grid grid-cols-2 text-center">
                            <div>{obj.start.charAt(0).toUpperCase() + obj.start.slice(1)}</div>
                            <div>{new Date(obj.updated_at).toLocaleString()}</div>
                            <div>{obj.end.charAt(0).toUpperCase() + obj.end.slice(1)}</div>
                            <div>Departure: {new Date(obj.departure).toLocaleString([], format)}</div>
                            <div>Amount: {obj.amount}</div>
                            <div>Status: <span className={`${obj.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>{obj.status.charAt(0).toUpperCase() + obj.status.slice(1)}</span></div>
                        </div>
                    ))
                    : 
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 m-5 rounded-lg shadow text-center">
                        <div className="text-gray-300">No transaction history yet.</div>
                    </div>
                }
            </div>
        )
    }
    return(
        <>
            <RenderHistory />
        </>
    )
}

export default History;