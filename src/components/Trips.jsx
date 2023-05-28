import { useEffect, useState } from "react"
import TripForm from './TripForm';
import TripsSeeBookings from "./TripsSeeBookings";


const Trips = (props) => {
    const { loginToken } = props
    const [tripsList, setTripsList] = useState([])

    const [showForm, setShowForm] = useState(false)
    const [tripComplete, setTripComplete] = useState(false)

    const [selectedTrip, setSelectedTrip] = useState('')
    const [seeBookings, setSeeBookings] = useState(false)

    const fetchTrip = async () => {
        try{
            const response = await fetch ('http://localhost:3001/trips', {
                method : "GET",
                headers : {
                    "Content-type": "applciation/json",
                    "Authorization": `${loginToken}`
                }
            })
            const fetchData = await response.json()
            setTripsList(fetchData)
        }
        catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        fetchTrip()
        if(tripComplete) {
            setTripComplete(false)
        }
        const interval = setInterval(fetchTrip, 5000)
        return () => {
            clearInterval(interval)
        }
    }, [tripComplete, selectedTrip.status])

    const getTripDetails = (obj) => {
        setSelectedTrip(obj)
        setSeeBookings(true)
    }

    const format = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC', timeZoneOffset: 480}
    const RenderTrips = () => {
        return(
            <>
                {
                    tripsList && tripsList.length ? tripsList.map((obj) => 
                    (
                        <div key={obj.id} onClick={() => getTripDetails(obj)}>
                            <div>{obj.start.charAt(0).toUpperCase() + obj.start.slice(1)} to {obj.end.charAt(0).toUpperCase() + obj.end.slice(1)}</div>
                            <div>{new Date(obj.departure).toLocaleString([], format)}</div>
                            <div>{obj.capacity - obj.total_passengers} available seats left</div>
                            <div>Status: {obj.status.charAt(0).toUpperCase() + obj.status.slice(1)}</div>
                        </div>
                    ))
                    :   <>
                            <div>No trips yet.</div>
                            <button onClick={() => {setShowForm(!showForm)}}>Create a Trip Now!</button>
                        </>
                }
            </>
        )
    }
    return(
        <>
            <RenderTrips />
            {
                showForm && 
                <TripForm 
                    setShowForm={setShowForm}
                    loginToken={loginToken} 
                    setTripComplete={setTripComplete} 
                />
            }
            {
                seeBookings && 
                <TripsSeeBookings 
                    loginToken={loginToken} 
                    setSeeBookings={setSeeBookings} 
                    selectedTrip={selectedTrip}
                    setSelectedTrip={setSelectedTrip} 
                />
            }
        </>
    )
}

export default Trips;