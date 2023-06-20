import Admin from "../components/Admin"
import Bookings from "../components/Bookings"
import Trips from "../components/Trips"

const Home = (props) => {
    const { userData, loginToken, setUserData } = props
    const RenderHome = () => {
        if(userData.role === 'admin' && userData.is_verified) {
            return <Admin userData={userData} loginToken={loginToken} />
        } else if(userData.role === 'operator' && userData.is_verified) {
            return <Trips loginToken={loginToken} setUserData={setUserData} />
        } else if (userData.role === 'commuter' && userData.is_verified) {
            return <Bookings userData={userData} loginToken={loginToken} setUserData={setUserData} />
        } else if (!userData.role && !userData.is_verified) {
            return(
                <>
                    <div>Set your user details on the settings and wait for admin approval.</div>
                </>
            )
        } else if (userData.role === 'operator' || userData.role === 'commuter' && !userData.is_verified) {
            return(
                <div className="p-4 mt-4 bg-gray-50 dark:bg-gray-700 mx-5 rounded-lg shadow mb-4 text-center text-white">
                    <div>User updated. Please wait for admin approval.</div>
                </div>
            )
        }
    }
    return(
        <div>
            <div>Hello {userData.firstname}!</div>
            <RenderHome />
        </div>
    )
}

export default Home;