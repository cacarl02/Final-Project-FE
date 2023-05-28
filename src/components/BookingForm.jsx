import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const BookingForm = (props) => {
    const { selectedPendingTrip, userData, loginToken, setBookConfirm } = props
    const [destinationsData, setDestinationsData] = useState([])
    
    const [selectedDestinationId, setSelectedDestinationId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        const destinationApi =
            selectedPendingTrip.start === 'pitx'
                ? 'https://retoolapi.dev/rl8FSO/northbound'
                : selectedPendingTrip.start === 'monumento'
                ? 'https://retoolapi.dev/h0sLzu/southbound'
                : '';

        const fetchDestinations = async () => {
            try {
                const response = await fetch(destinationApi, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    },
                });
                const fetchedData = await response.json();
                setDestinationsData(fetchedData);
            } catch (error) {
                console.error(error);
            }
        };

        if (destinationApi) {
            fetchDestinations();
        }
    }, [selectedPendingTrip]);

    const selectedDestination = destinationsData.find((obj) => {return obj.id === selectedDestinationId})

    const postBook = async (e) => {
        e.preventDefault()

        try{
            const response = await fetch ('http://localhost:3001/bookings', {
                method : "POST",
                headers : {
                    "Content-type": "application/json",
                    "Authorization": `${loginToken}`
                },
                body : JSON.stringify({
                    start: `${destinationsData[0].destination}`,
                    end: `${selectedDestination.destination}`,
                    trip_id: `${selectedPendingTrip.id}`,
                    amount: `${selectedDestination.fare}`,
                    departure: `${selectedPendingTrip.departure}`
                })
            })
            const fetchData = await response.json()
            if(!fetchData.error) {
                setBookConfirm(true)
                setDestinationsData([])
                navigate('/')
            } else {
                setErrorMessage(fetchData.error ? fetchData.error : "")
            }
        }
        catch(error){
            console.error(error)
        }

    }

    const RenderBookingForm = () => {
        
        return(
            <div>
                <div>From: {selectedPendingTrip.start.charAt(0).toUpperCase() + selectedPendingTrip.start.slice(1)}</div>
                <span>To: </span>
                <select value={selectedDestinationId} onChange={(e) => setSelectedDestinationId(Number(e.target.value))}>
                    <option value="">Select a destination</option>
                    {destinationsData.slice(1).map((obj) => (
                    <option key={obj.id} value={obj.id}>
                        {obj.destination}
                    </option>
                ))}
                </select>
                {selectedDestination && (
                    <div>Fare: {selectedDestination.fare}</div>
                )}
                {userData && selectedDestination && (
                    <div>Balance after booking: {userData.balance - selectedDestination.fare}</div>
                )}
                <button onClick={postBook}>Confirm Booking</button>
            </div>
        )
    }
    
    return (
        <div>
            <RenderBookingForm />
        </div>
    )

    
}

export default BookingForm