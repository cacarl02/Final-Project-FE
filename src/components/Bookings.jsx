import { useEffect, useState } from "react"
import BookingShow from "./BookingShow"
import { Link } from "react-router-dom"


const Bookings = (props) => {
    const { loginToken, setUserData } = props
    const [bookingsList, setBookingsList] = useState([])

    const [showBooking, setShowBooking] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState('')
    const fetchBooking = async() => {

        try{
            const response = await fetch ('https://final-project-app.onrender.com/bookings', {
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
        setShowBooking(!showBooking)
    }

    const format = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC', timeZoneOffset: 480}
    const RenderBookings = () => {
        return(
            <section>
                {
                    bookingsList && bookingsList.length ? bookingsList.map((obj) => 
                    (
                        <div key={obj.id} 
                            onClick={() => getBookingDetails(obj)}
                            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow m-4 grid grid-cols-2 text-center text-gray-300 cursor-pointer"
                        >
                            <div>{obj.start.charAt(0).toUpperCase() + obj.start.slice(1)}</div>
                            <div>Departure: {new Date(obj.departure).toLocaleString([], format)}</div>
                            <div>{obj.end.charAt(0).toUpperCase() + obj.end.slice(1)}</div>
                            <div>Status: <span className={`${obj.status === 'pending' ? 'text-orange-500' : 'text-yellow-500'}`}>{obj.status.charAt(0).toUpperCase() + obj.status.slice(1)}</span></div>
                        </div>
                    ))
                    :   <div className="p-4 bg-gray-50 dark:bg-gray-700 mx-5 rounded-lg shadow mb-4 text-center">
                            <div className="text-gray-300 mb-4">No bookings yet.</div>
                            <Link to='/pending_trips' className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Book now!</Link>
                        </div>
                }
            </section>
        )
    }
    return(
        <main>
            <RenderBookings />
            {showBooking && <BookingShow setUserData={setUserData} loginToken={loginToken} selectedBooking={selectedBooking} setSelectedBooking={setSelectedBooking} setShowBooking={setShowBooking} />}
        </main>
    )
}

export default Bookings;