import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const BookingForm = (props) => {
    const { selectedPendingTrip, userData, loginToken, setBookConfirm, setUserData } = props
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
                setUserData(prevData => ({
                    ...prevData,
                    balance: parseFloat(prevData.balance) - parseFloat(selectedDestination.fare)
                }))
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
            <div className='p-4 bg-gray-50 dark:bg-gray-700 mx-5 rounded-lg shadow m-4'>
                <form onSubmit={postBook}>
                    <div className='grid grid-cols-2 text-center'>
                        <div className=' text-gray-300'>From: {selectedPendingTrip.start.charAt(0).toUpperCase() + selectedPendingTrip.start.slice(1)}</div>
                        <div>
                            <span className=' text-gray-300'>To: </span>
                            <select value={selectedDestinationId} onChange={(e) => setSelectedDestinationId(Number(e.target.value))}>
                                <option value="">Select a destination</option>
                                {destinationsData.slice(1).map((obj) => (
                                <option key={obj.id} value={obj.id}>
                                    {obj.destination}
                                </option>
                            ))}
                            </select>                         
                        </div>
                    </div>
                    <div className='text-center text-gray-300'>
                        {selectedDestination && (
                            <div>Fare: {selectedDestination.fare}</div>
                        )}
                        {userData && selectedDestination && (
                            <div>Balance after booking: {userData.balance - selectedDestination.fare}</div>
                        )}
                    </div>
                    <div className='flex justify-center'>
                        <button type='submit' className='text-white mt-4 mx-10 text-xl bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Confirm Booking</button>
                    </div>
                </form>
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