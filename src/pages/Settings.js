import { useEffect, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import UserEditForm from '../components/UserEditForm'
import TopUpForm from '../components/UserTopUpForm'

const Settings = (props) => {
    const { loginToken, userData, setUserData } = props
    const [settingsData, setSettingsData] = useState('')
    const [userFormPopup, setUserFormPopup] = useState(false)
    const [topUpFormPopup, setTopUpFormPopup] = useState(false)
    const fetchsettingsData = async () => {
      try{
        const response = await fetch (`http://localhost:3001/users/${userData.id}`, {
            method : "GET",
            headers : {
                "Content-type": "application/json",
                "Authorization" : `${loginToken}`
            }
        })
        const fetchedData = await response.json()
        setSettingsData(fetchedData)
      }
      catch(error){
          console.error(error)
      }
    }

    useEffect(() => {
      fetchsettingsData()
    }, [loginToken, topUpFormPopup, userFormPopup])

    const editUser = () => {
      setUserFormPopup(!userFormPopup)
    }
    const UserNameData = () => {
      return (
        <span>
          {settingsData.firstname && settingsData.lastname ? (
              <p>{`${settingsData.firstname} ${settingsData.lastname}`}</p>
          ) : (
            <p>No user data yet</p>
          )}
        </span>
      )
    }
      
    const formattedDate = new Date(settingsData.created_at).toLocaleDateString()
    return(
      <>
        <img src={settingsData.photoData} alt='' />
        <div className="text-3xl flex">
          <UserNameData />
          {settingsData.isVerified && <MdVerified className='text-blue-500' />}
        </div>
        <div>Role: {settingsData.role ? `${settingsData.role}`.charAt(0).toUpperCase() + `${settingsData.role}`.slice(1) : 'N/A'}</div>
        <div>Date Created: {formattedDate}</div>
        <div className='flex'>
          <span>Available Balance: ₱ {settingsData.balance}</span>
          <button onClick={() => setTopUpFormPopup(!topUpFormPopup)}>Top-up</button>
        </div>
        <button onClick={editUser}>Edit</button>
        {topUpFormPopup && <TopUpForm loginToken={loginToken} settingsData={settingsData} setTopUpFormPopup={setTopUpFormPopup}/>}
        {userFormPopup && <UserEditForm loginToken={loginToken} settingsData={settingsData} setUserFormPopup={setUserFormPopup} userData={userData} setUserData={setUserData} />}
      </>
    )
}

export default Settings;