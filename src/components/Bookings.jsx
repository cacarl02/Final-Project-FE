import { useEffect, useState } from "react"


const Bookings = (props) => {
    const { loginToken } = props
    const [bookingsList, setBookingsList] = useState([])
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
    }, [])

    const format = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC', timeZoneOffset: 480}
    const RenderBookings = () => {
        return(
            <>
                {
                    bookingsList && bookingsList.length ? bookingsList.map((obj) => 
                    (
                        <div key={obj.id}>
                            <div>{obj.start.charAt(0).toUpperCase() + obj.start.slice(1)}</div>
                            <div>{obj.end.charAt(0).toUpperCase() + obj.end.slice(1)}</div>
                            <div>Departure: {new Date(obj.departure).toLocaleString([], format)}</div>
                            <div>Status: {obj.status.charAt(0).toUpperCase() + obj.status.slice(1)}</div>
                        </div>
                    ))
                    :   <>
                            <div>No bookings yet.</div>
                            <button>Book Now!</button>
                        </>
                }
            </>
        )
    }
    return(
        <>
            <RenderBookings />
        </>
    )
}

export default Bookings;