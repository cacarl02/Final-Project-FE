import React, { useEffect, useState } from 'react'

const TripsSeeBookings = (props) => {
    const { loginToken, setSeeBookings, selectedTrip, setSelectedTrip, setUserData } = props

    const [selectedTripData, setSelectedTripData] = useState([])
    const fetchSelectedTrip = async () => {

        try {
            const response = await fetch (`https://final-project-app.onrender.com/trips/${selectedTrip.id}/bookings_on_trip`, {
                method : "GET",
                headers : {
                    "Content-type": "application/json",
                    "Authorization": `${loginToken}`
                }
            })
            const data = await response.json()
            setSelectedTripData(data)
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
      if(status === 'completed') {
          setUserData(prevData => ({
            ...prevData,
            balance: parseFloat(selectedTrip.total_amount) + parseFloat(prevData.balance)
          }))
      }
      patchTripStatus(status);
    };

    const patchTripStatus = async (status) => {
        try {
            await fetch (`https://final-project-app.onrender.com/trips/${selectedTrip.id}`, {
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

    const Tablehead = () => {

    }
      
    const format = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC', timeZoneOffset: 480}
    return(
        <section className='bg-gray-50 dark:bg-gray-700 mx-5 rounded-lg shadow mb-4'>
            <div className='text-center text-white text-xl py-4'>Trip Status</div>
            <div className='text-center text-gray-300 grid grid-cols-2'>
                <div>Start: {selectedTrip.start.charAt(0).toUpperCase() + selectedTrip.start.slice(1)}</div>
                <div>Departure: {new Date(selectedTrip.departure).toLocaleString([], format)}</div>
                <div>End: {selectedTrip.end.charAt(0).toUpperCase() + selectedTrip.end.slice(1)}</div>
                <div>Capacity: {selectedTrip.capacity} <span className='text-decoration-line: underline'>pax</span></div>
            </div>
            <div className='text-center text-white text-xl py-4'>Passenger Details</div>
            <div className='grid grid-cols-2'>
                <div class="flex justify-center">
                    <table className="divide-y divide-gray-400">
                        <thead className="bg-gray-800">
                            <tr>
                            <th className="py-2 px-4 text-left font-medium text-gray-400">Index</th>
                            <th className="py-2 px-4 text-left font-medium text-gray-400">ID</th>
                            <th className="py-2 px-4 text-left font-medium text-gray-400">Endpoint</th>
                            <th className="py-2 px-4 text-left font-medium text-gray-400">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-400">
                            {selectedTripData && selectedTripData.length ? (
                            selectedTripData.map((obj, index) => (
                                <tr key={obj.id}>
                                    <td className="py-2 px-4 font-medium text-gray-400">{index + 1}</td>
                                    <td className="py-2 px-4 font-medium text-gray-400">{obj.user_id}</td>
                                    <td className="py-2 px-4 font-medium text-gray-400">{obj.end}</td>
                                    <td className="py-2 px-4 font-medium text-gray-400">{obj.amount}</td>
                                </tr>
                            ))
                            ) : (
                            <tr>
                                <td colSpan="4" className="py-4 px-4 text-gray-400 text-center">
                                No data available.
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='flex flex-col text-center text-white'>
                    <div>No. of Passengers: {selectedTrip.total_passengers}</div>
                    <div>Total Amount: {selectedTrip.total_amount}</div>
                </div>
            </div>

            { selectedTrip.status === 'pending' &&
                <div className='flex justify-center py-5'>
                    <button 
                        onClick={() => changeTripStatus('ongoing')}
                        className='text-white mx-10 text-xl bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'                  
                        >Start Trip
                    </button>
                    <button 
                        onClick={() => changeTripStatus('cancelled')}
                        className='text-white mx-10 text-xl bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                        >Cancel Trip
                    </button>
                </div>
            }
            <div className='flex justify-center'>
                {selectedTrip.status === 'ongoing' && (
                    <button onClick={() => changeTripStatus('completed')} className='text-white mx-10 my-4 text-xl bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Complete Trip</button>
                )}
            </div>
        </section>
    )
}

export default TripsSeeBookings