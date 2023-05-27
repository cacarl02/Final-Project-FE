import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const TripForm = (props) => {
    const { loginToken, setTripComplete, userData } = props
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
            <div>From: {destinationsData[0].destination}</div>
            <div>To: {destinationsData[destinationsData.length-1].destination}</div>
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
    console.log(departureTime, capacity)
    const DepartureAndCapacity = () => {

        return(
            <div>
                <div>
                    <label>Departure:</label>
                    <select value={departureTime} onChange={(e) => setDepartureTime(e.target.value)}>
                        <option value="">Select Departure</option>
                        {generateDepartureOptions()}
                    </select>
                </div>
                <div>
                    <label>Capacity:</label>
                    <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                </div>
            </div>
        )
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
            }
            setErrorMessage(fetchData.error ? fetchData.error : "")
        }
        catch(error){
            console.error(error)
        }
    }

    return(
        <form>
            <ChooseBound />
            { bound && <ChooseDestination /> }
            <DepartureAndCapacity />
            <button type="submit" onClick={postTrip}>Create Trip</button>
        </form>
    )
}

export default TripForm;