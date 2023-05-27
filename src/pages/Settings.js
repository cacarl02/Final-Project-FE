import { useEffect, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import UserEditForm from '../components/UserEditForm'

const Settings = (props) => {
    const { loginToken, userId } = props
    const [userData, setUserData] = useState('')
    const [userFormPopup, setUserFormPopup] = useState(false)

    const fetchUserData = async () => {
      try{
        const response = await fetch (`http://localhost:3001/users/${userId}`, {
            method : "GET",
            headers : {
                "Content-type": "application/json",
                "Authorization" : `${loginToken}`
            }
        })
        const fetchedData = await response.json()
        setUserData(fetchedData)
        console.log(userData)
      }
      catch(error){
          console.error(error)
      }
    }

    useEffect(() => {
      fetchUserData()
    }, [loginToken])

    const editUser = () => {
      setUserFormPopup(!userFormPopup)
      console.log(userFormPopup)
    }
    const UserNameData = () => {
      return (
        <span>
          {userData.firstname && userData.lastname ? (
              <p>{`${userData.firstname} ${userData.lastname}`}</p>
          ) : (
            <p>No user data yet</p>
          )}
        </span>
      )
    }

    const updateBalance = () => {

    }
      
    const formattedDate = new Date(userData.created_at).toLocaleDateString()
    return(
      <>
        <img src={userData.photoData} alt='' />
        <div className="text-3xl flex">
          <UserNameData />
          {userData.isVerified && <MdVerified className='text-blue-500' />}
        </div>
        <div>Role: {userData.role ? `${userData.role}`.charAt(0).toUpperCase() + `${userData.role}`.slice(1) : 'N/A'}</div>
        <div>Date Created: {formattedDate}</div>
        <div className='flex'>
          <span>Available Balance: ₱ {userData.balance}</span>
          <button>Top-up</button>
        </div>
        <UserEditForm loginToken={loginToken} userData={userData} />
        <button onClick={editUser}>Edit</button>
        <button onClick={updateBalance}>Update</button>
      </>
    )
}

export default Settings;