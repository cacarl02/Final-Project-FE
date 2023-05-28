import React, { useEffect, useState } from 'react'

const TripsSeeBookings = (props) => {
    const { loginToken, setSeeBookings, selectedTrip, setSelectedTrip } = props

    const [selectedTripData, setSelectedTripData] = useState([])
    const fetchSelectedTrip = async () => {

        try {
            const response = await fetch (`http://localhost:3001/trips/${selectedTrip.id}/bookings_on_trip`, {
                method : "GET",
                headers : {
                    "Content-type": "application/json",
                    "Authorization": `${loginToken}`
                }
            })
            const data = await response.json()
            setSelectedTripData(data)
            console.log(selectedTrip)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchSelectedTrip()
    }, [loginToken])

    const changeTripStatus = (status) => {
      setSelectedTrip(prevTrip => ({
        ...prevTrip,
        status: status
      }));
      patchTripStatus(status);
    };

    const patchTripStatus = async (status) => {
        try {
            await fetch (`http://localhost:3001/trips/${selectedTrip.id}`, {
                method : "PATCH",
                headers : {
                    "Content-type" : "application/json",
                    "Authorization": `${loginToken}`
                },
                body : JSON.stringify({
                    status: status
                })
            })
            setSeeBookings(false)

        } catch (error) {
            console.error(error)
        }
    }
      
    const format = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC', timeZoneOffset: 480}
    return(
        <div>
            <div>{selectedTrip.start}</div>
            <div>{selectedTrip.end}</div>
            <div>{new Date(selectedTrip.departure).toLocaleString([], format)}</div>
            <div>{selectedTrip.capacity}</div>

            <div>Passenger List</div>
            {
                selectedTripData && selectedTripData.length ? selectedTripData.map((obj) => 
                (
                    <div key={obj.id} className='flex'>
                        <div>{obj.user_id}</div>
                        <div>{obj.end}</div>
                        <div>{obj.amount}</div>
                    </div>
                ))
                : <div></div>
            }
            <div>{selectedTrip.total_passengers}</div>
            <div>{selectedTrip.total_amount}</div>
            { selectedTrip.status === 'pending' &&
                <div>
                    <button onClick={() => changeTripStatus('ongoing')}>Start Trip</button>
                    <button onClick={() => changeTripStatus('cancelled')}>Cancel Trip</button>
                </div>
            }
            {selectedTrip.status === 'ongoing' && (
                <button onClick={() => changeTripStatus('completed')}>Complete Trip</button>
            )}
        </div>
    )
}

export default TripsSeeBookings