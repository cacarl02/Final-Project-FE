import React, { useEffect, useState } from 'react'
import BookingForm from '../components/BookingForm'

const PendingTrips = (props) => {
    const { loginToken, userData, bookConfirm, setBookConfirm } = props
    const [fetchedPendingTrips, setFetchedPendingTrips] = useState([])

    const [showForm, setShowForm] = useState(false)
    const [selectedPendingTrip, setSelectedPendingTrip] = useState(null)

    const pendingTripsList = async () => {

        try {
            const response = await fetch ('http://localhost:3001/trips/pending_trips', {
                method : "GET",
                headers : {
                    "Content-type": "application/json",
                    "Authorization": `${loginToken}`
                }
            })

            const fetchData = await response.json()
            setFetchedPendingTrips(fetchData)
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        pendingTripsList()
    }, [bookConfirm])

    const getPendingTripsData = (obj) => {
        setSelectedPendingTrip(obj)
        setShowForm(true)
    }

    const format = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC', timeZoneOffset: 480}
    const RenderPendingTrips = () => {
        return(
            <>
                {
                    fetchedPendingTrips && fetchedPendingTrips.length ? fetchedPendingTrips.map((obj) => 
                    (
                        <div key={obj.id} onClick={() => getPendingTripsData(obj)}>
                            <div>{obj.start.charAt(0).toUpperCase() + obj.start.slice(1)} to {obj.end.charAt(0).toUpperCase() + obj.end.slice(1)}</div>
                            <div>{new Date(obj.departure).toLocaleString([], format)}</div>
                            <div>{obj.capacity - obj.total_passengers} available seats left</div>
                            <div>Status: {obj.status.charAt(0).toUpperCase() + obj.status.slice(1)}</div>
                        </div>
                    ))
                    :   <>
                            <div>No pending trips yet.</div>
                        </>
                }
            </>
        )
    }

    return (
        <div>
            <RenderPendingTrips />
            {showForm && 
                <BookingForm 
                selectedPendingTrip={selectedPendingTrip} 
                userData={userData} 
                loginToken={loginToken}
                setBookConfirm={setBookConfirm} />}
        </div>
    )
}

export default PendingTrips