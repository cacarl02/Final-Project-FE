import { useEffect, useState } from "react";


const History = (props) => {
    const { loginToken, userData } = props
    const [historyList, setHistoryList] = useState([])
    
    const fetchHistory = async() => {

        var url = ''

        if(userData.role === 'operator') {
            url = `http://localhost:3001/trips/${userData.id}/history`
        }
        if(userData.role === 'commuter') {
            url = `http://localhost:3001/bookings/${userData.id}/history`
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
            <>
                {
                    userData.role === 'operator' && historyList && historyList.length ? historyList.map((obj) => (
                        <div key={obj.id}>
                            <div>{obj.start.charAt(0).toUpperCase() + obj.start.slice(1)} to {obj.end.charAt(0).toUpperCase() + obj.end.slice(1)}</div>
                            <div>{new Date(obj.updated_at).toLocaleString()}</div>
                            <div>Departure: {new Date(obj.departure).toLocaleDateString([], format)}</div>
                            <div>Total Passengers: {obj.total_passengers}</div>
                            <div>Total Amount: {obj.total_amount}</div>
                            <div>Status: {obj.status.charAt(0).toUpperCase() + obj.status.slice(1)}</div>
                        </div>
                    ))
                    : userData.role === 'commuter' && historyList && historyList.length ? historyList.map((obj) => (
                        <div key={obj.id}>
                            <div>{obj.start.charAt(0).toUpperCase() + obj.start.slice(1)}</div>
                            <div>{new Date(obj.updated_at).toLocaleString()}</div>
                            <div>{obj.end.charAt(0).toUpperCase() + obj.end.slice(1)}</div>
                            <div>Departure: {new Date(obj.departure).toLocaleString([], format)}</div>
                            <div>Amount: {obj.amount}</div>
                            <div>Status: {obj.status.charAt(0).toUpperCase() + obj.status.slice(1)}</div>
                        </div>
                    ))
                    : <div>No transaction history yet.</div>
                }
            </>
        )
    }
    return(
        <>
            <RenderHistory />
        </>
    )
}

export default History;