import { useEffect, useState } from "react"
import BookingShow from "./BookingShow"
import { Link } from "react-router-dom"


const Bookings = (props) => {
    const { loginToken } = props
    const [bookingsList, setBookingsList] = useState([])

    const [showBooking, setShowBooking] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState('')
    const fetchBooking = async() => {

        try{
            const response = await fetch ('http://localhost:3001/bookings', {
                method : "GET",
                headers : {
                    "Content-type": "application/json",
                    "Authorization": `${loginToken}`
                }
            })
            const fetchData = await response.json()
            setBookingsList(fetchData)

        }
        catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        fetchBooking()
    }, [loginToken, selectedBooking.status])

    const getBookingDetails = (obj) => {
        setSelectedBooking(obj)
        setShowBooking(true)
    }

    const format = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC', timeZoneOffset: 480}
    const RenderBookings = () => {
        return(
            <section>
                {
                    bookingsList && bookingsList.length ? bookingsList.map((obj) => 
                    (
                        <div key={obj.id} onClick={() => getBookingDetails(obj)}>
                            <div>{obj.start.charAt(0).toUpperCase() + obj.start.slice(1)}</div>
                            <div>{obj.end.charAt(0).toUpperCase() + obj.end.slice(1)}</div>
                            <div>Departure: {new Date(obj.departure).toLocaleString([], format)}</div>
                            <div>Status: {obj.status.charAt(0).toUpperCase() + obj.status.slice(1)}</div>
                        </div>
                    ))
                    :   <>
                            <div>No bookings yet.</div>
                            <Link to='/pending_trips' className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Book now!</Link>
                        </>
                }
            </section>
        )
    }
    return(
        <main>
            <RenderBookings />
            {showBooking && <BookingShow loginToken={loginToken} selectedBooking={selectedBooking} setSelectedBooking={setSelectedBooking} setShowBooking={setShowBooking} />}
        </main>
    )
}

export default Bookings;