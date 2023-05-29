import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const TripForm = (props) => {
    const { loginToken, setTripComplete, setShowForm } = props
    const [destinationsData, setDestinationsData] = useState([]);
    const [bound, setBound] = useState('')
    
    const [departureTime, setDepartureTime] = useState('')
    const [capacity, setCapacity] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    
    const destinationApi = bound === 'northbound' ? 'https://retoolapi.dev/rl8FSO/northbound' :
                           bound === 'southbound' ? 'https://retoolapi.dev/h0sLzu/southbound' :
                            '';

    const ChooseBound = () => {
        return (
            <div>
                <label className="text-gray-400">Direction: </label>
                <select onChange={(e) => setBound(e.target.value)} value={bound}>
                    <option value="">Select Direction</option>
                    <option value="northbound">Northbound</option>
                    <option value="southbound">Southbound</option>
                </select>
            </div>
        )
    }

    const fetchDestinations = async () => {
    try {
        const response = await fetch(destinationApi, {
            method : "GET",
            headers : {
                'content-type': 'application/json'
            }
        })
        const data = await response.json();
        setDestinationsData(data);
    } catch (error) {
        console.error(error);
    }
    };

    useEffect(() => {
        if(destinationApi){
            fetchDestinations();
        }
    }, [destinationApi]);

    const ChooseDestination = () => {
        if (destinationsData.length === 0) {
            return null;
          }
    return (
        <div>
            <div className="text-gray-400">From: {destinationsData[0].destination}</div>
            <div className="text-gray-400">To: {destinationsData[destinationsData.length-1].destination}</div>
        </div>
        );  
    } 

    const generateDepartureOptions = () => {
        const startTime = 0; // Start time in hours (0 corresponds to midnight)
        const endTime = 24; // End time in hours (24 corresponds to midnight of the next day)
        const interval = 2; // Interval in hours
    
        const options = [];
    
        for (let i = startTime; i < endTime; i += interval) {
          const time = `${String(i).padStart(2, '0')}:00`; // Format the time as HH:00
          options.push(
            <option key={time} value={time}>
              {time}
            </option>
          );
        }
        return options
    }

    const postTrip = async (e) => {
        e.preventDefault()

        try{
            const response = await fetch ('http://localhost:3001/trips', {
                method : "POST",
                headers : {
                    "Content-type": "application/json",
                    "Authorization": `${loginToken}`
                },
                body : JSON.stringify({
                    start: `${destinationsData[0].destination_id}`,
                    end: `${destinationsData[destinationsData.length-1].destination_id}`,
                    departure: `${departureTime}`,
                    capacity: `${capacity}`
                })
            })
            const fetchData = await response.json()
            if(!fetchData.error) {
                setTripComplete(true)
                setDestinationsData([])
                navigate('/')
                setShowForm(false)
            }
            setErrorMessage(fetchData.error ? fetchData.error : "")
        }
        catch(error){
            console.error(error)
        }
    }

    return(
        <div className="p-4 bg-gray-50 dark:bg-gray-700 mx-5 rounded-lg shadow mb-4">
            <form onSubmit={postTrip}>
                <div className="text-center grid grid-cols-2">
                    <div>
                        <ChooseBound />
                        { bound && <ChooseDestination /> }
                    </div>
                    <div>
                        <div>
                            <label className="text-gray-400">Departure: </label>
                            <select value={departureTime} onChange={(e) => setDepartureTime(e.target.value)}>
                                <option value="">Select Departure</option>
                                {generateDepartureOptions()}
                            </select>
                        </div>
                        <div>
                            <label className="text-gray-400">Capacity: </label>
                            <input 
                                type="number" 
                                value={capacity} 
                                onChange={(e) => setCapacity(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="text-white mx-10 text-xl bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create Trip</button>
                </div>
            </form>
        </div>
    )
}

export default TripForm;