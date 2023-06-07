import React, { useEffect, useState } from 'react'
import BookingForm from '../components/BookingForm'

const PendingTrips = (props) => {
    const { loginToken, userData, bookConfirm, setBookConfirm, setUserData } = props
    const [fetchedPendingTrips, setFetchedPendingTrips] = useState([])

    const [showForm, setShowForm] = useState(false)
    const [selectedPendingTrip, setSelectedPendingTrip] = useState(null)

    const pendingTripsList = async () => {

        try {
            const response = await fetch ('https://final-project-app.onrender.com/trips/pending_trips', {
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
        if(userData.role === 'commuter') {
            setSelectedPendingTrip(obj)
            setShowForm(true)
        }
    }

    const format = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC', timeZoneOffset: 480}
    const RenderPendingTrips = () => {
        return(
            <div className='h-64 overflow-y-scroll overflow-hidden text-gray-300'>
                {
                    fetchedPendingTrips && fetchedPendingTrips.length ? fetchedPendingTrips.map((obj) => 
                    (
                        <div key={obj.id} onClick={() => getPendingTripsData(obj)} className='p-4 mt-4 bg-gray-50 dark:bg-gray-700 mx-5 rounded-lg shadow m-4 grid grid-cols-2 text-center cursor-pointer'>
                            <div>{obj.start.charAt(0).toUpperCase() + obj.start.slice(1)} to {obj.end.charAt(0).toUpperCase() + obj.end.slice(1)}</div>
                            <div>{new Date(obj.departure).toLocaleString([], format)}</div>
                            <div className={`${obj.capacity - obj.total_passengers >5 ? 'text-green-500' : 'text-red-500'}`}>
                                {obj.capacity - obj.total_passengers} available seats left
                            </div>
                            <div>
                                Status: <span className={`${obj.status === 'pending' ? 'text-orange-500' : 'text-yellow-500'}`}>{obj.status.charAt(0).toUpperCase() + obj.status.slice(1)}</span>
                            </div>
                        </div>
                    ))
                    :   <div className="p-4 bg-gray-50 dark:bg-gray-700 mx-5 rounded-lg shadow mb-4 text-center">
                            <div className="text-gray-300">No pending trips yet.</div>
                        </div>
                }
            </div>
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
                setBookConfirm={setBookConfirm}
                setUserData={setUserData} />}
        </div>
    )
}

export default PendingTrips