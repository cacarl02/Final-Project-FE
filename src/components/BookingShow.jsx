import React from 'react'

const BookingShow = (props) => {
    const { loginToken, selectedBooking, setSelectedBooking, setShowBooking, setUserData } = props

    const changeBookingStatus = (status) => {
            setSelectedBooking(prevBooking => ({
                ...prevBooking,
                status: status
            }));
            setUserData(prevData => ({
                ...prevData,
                balance: parseFloat(selectedBooking.amount) + parseFloat(prevData.balance)
            }))
            patchBookingStatus(status)
    }

    const patchBookingStatus = async (status) => {
        try {
            await fetch (`http://localhost:3001/bookings/${selectedBooking.id}`, {
                method : "PATCH",
                headers : {
                    "Content-type": "application/json",
                    "Authorization": `${loginToken}`
                },
                body : JSON.stringify({
                    status: status
                })
            })
            setShowBooking(false)
        } catch (error) {
            console.error(error)
        }
    }


    const format = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC', timeZoneOffset: 480}
    return (
        <div className='p-4 bg-gray-50 dark:bg-gray-700 mx-5 rounded-lg shadow m-4 text-center text-gray-400'>
            <div className='grid grid-cols-2'>
                <div>From: {selectedBooking.start}</div>
                <div>Departure: {new Date(selectedBooking.departure).toLocaleString([], format)}</div>
                <div>To: {selectedBooking.end}</div>
                <div>Fare: {selectedBooking.amount}</div>
            </div>
            <div>
                { selectedBooking.status === 'pending' && 
                <button 
                    onClick={() => changeBookingStatus('cancelled')}
                    className='text-white mx-10 my-4 text-xl bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                    >Cancel Booking
                </button>
                }
            </div>
        </div>
    )
}

export default BookingShow