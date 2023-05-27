import Admin from "../components/Admin"
import Bookings from "../components/Bookings"
import Trips from "../components/Trips"

const Home = (props) => {
    const { userData, loginToken } = props
    const RenderHome = () => {
        if(userData.role === 'admin') {
            return <Admin userData={userData} loginToken={loginToken} />
        } else if(userData.role === 'operator') {
            return <Trips userData={userData} loginToken={loginToken} />
        } else if (userData.role === 'commuter') {
            return <Bookings userData={userData} loginToken={loginToken} />
        } else {
            return(
                <>
                    <div>Select your role on the settings</div>
                </>
            )
        }
    }
    return(
        <>
            <div>Hello {userData.firstname}!</div>
            <RenderHome />
        </>
    )
}

export default Home;