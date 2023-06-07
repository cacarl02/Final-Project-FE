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
      <div className='py-10 px-4 bg-gray-50 dark:bg-gray-700 m-5 rounded-lg shadow text-white grid grid-cols-2'>
        <div className='px-3'>
          <img src={settingsData.photo_data} alt='' />
          <div>image</div>
          <div>Date Created: {formattedDate}</div>
          <div className='p-6 mt-4 bg-gray-50 dark:bg-gray-600 rounded-lg inline-flex'>
            <span className='py-1'>Available Balance: ₱ {settingsData.balance}</span>
            <button 
              onClick={() => setTopUpFormPopup(!topUpFormPopup)}
              className='px-3 py-1 ml-4 text-white bg-green-600 rounded hover:bg-green-700'>Top-up
            </button>
          </div>
        </div>
        <div className='px-3'>
          <div className="text-3xl flex pb-5">
            <UserNameData />
            {settingsData.is_verified && <MdVerified className='text-yellow-500 ml-3' />}
          </div>
          <div>Role: {settingsData.role ? `${settingsData.role}`.charAt(0).toUpperCase() + `${settingsData.role}`.slice(1) : 'N/A'}</div>
          <div>Email: {settingsData.email}</div>
          <button 
            onClick={editUser}
            className='px-4 py-1 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600'
            >Edit
          </button>
        </div>
        {topUpFormPopup && <TopUpForm loginToken={loginToken} setUserData={setUserData} settingsData={settingsData} setTopUpFormPopup={setTopUpFormPopup}/>}
        {userFormPopup && <UserEditForm loginToken={loginToken} settingsData={settingsData} setUserFormPopup={setUserFormPopup} userData={userData} setUserData={setUserData} />}
      </div>
    )
}

export default Settings;