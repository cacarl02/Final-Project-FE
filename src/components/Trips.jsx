import { useEffect, useState } from "react"
import TripForm from './TripForm';
import TripsSeeBookings from "./TripsSeeBookings";


const Trips = (props) => {
    const { loginToken , setUserData } = props
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
        setSeeBookings(!seeBookings)
    }

    const format = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC', timeZoneOffset: 480}
    const RenderTrips = () => {
        return (
            <>
              {tripsList && tripsList.length ? (
                tripsList.map((obj) => (
                  <div
                    key={obj.id}
                    onClick={() => getTripDetails(obj)}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow m-4 grid grid-cols-2 text-center text-white cursor-pointer"
                  >
                    <div className="font-bold">
                      {obj.start.charAt(0).toUpperCase() + obj.start.slice(1)} to{' '}
                      {obj.end.charAt(0).toUpperCase() + obj.end.slice(1)}
                    </div>
                    <div>
                      Departure: {new Date(obj.departure).toLocaleString([], format)}
                    </div>
                    <div className={`${obj.capacity - obj.total_passengers >5 ? 'text-green-500' : 'text-red-500'}`}>
                      {obj.capacity - obj.total_passengers} available seats left
                    </div>
                    <div>
                      Status: <span className={`${obj.status === 'pending' ? 'text-orange-500' : 'text-yellow-500'}`}>{obj.status.charAt(0).toUpperCase() + obj.status.slice(1)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 mx-5 rounded-lg shadow mb-4 text-center">
                  <div className="text-gray-300">No trips yet.</div>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Create a Trip Now!
                  </button>
                </div>
              )}
            </>
          );
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
                    setUserData={setUserData}
                />
            }
        </>
    )
}

export default Trips;