import React from 'react'

const BookingShow = (props) => {
    const { loginToken, selectedBooking, setSelectedBooking, setShowBooking } = props

    const changeBookingStatus = (status) => {
            setSelectedBooking(prevBooking => ({
                ...prevBooking,
                status: status
            }));
    }

    const patchBookingStatus = async (status) => {
        console.log('konichiwa')
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
        <div>
            <div>{selectedBooking.start}</div>
            <div>{selectedBooking.end}</div>
            <div>{new Date(selectedBooking.departure).toLocaleString([], format)}</div>
            <div>{selectedBooking.amount}</div>
            { selectedBooking.status === 'pending' && <button onClick={() => changeBookingStatus('cancelled')}>Cancel Booking</button>}
        </div>
    )
}

export default BookingShow