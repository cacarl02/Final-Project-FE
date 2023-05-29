import React from 'react'
import { MdVerified } from 'react-icons/md'

const AdminSeeUser = (props) => {
    const { selectedUser, verifyUser } = props

    const UserNameData = () => {
      return (
        <span>
          {selectedUser.firstname && selectedUser.lastname ? (
              <p>{`${selectedUser.firstname} ${selectedUser.lastname}`}</p>
          ) : (
            <p>No user data yet</p>
          )}
        </span>
      )
    }

    const formattedDate = new Date(selectedUser.created_at).toLocaleDateString()
  return (
    <div className='p-10 bg-gray-50 dark:bg-gray-700 m-5 rounded-lg shadow text-white grid grid-cols-2'>
      <div>
        <img src={selectedUser.photo_data} alt='' />
        <div>image</div>
        <div>Date Created: {formattedDate}</div>
        <div className='p-6 mt-4 bg-gray-50 dark:bg-gray-600 rounded-lg inline-flex'>
          <span className='py-1'>Available Balance: ₱ {selectedUser.balance}</span>
        </div>
      </div>
      <div>
          <div className="text-3xl flex pb-5">
            <UserNameData />
            {selectedUser.is_verified && <MdVerified className='text-yellow-500 ml-3' />}
          </div>
          <div>Role: {selectedUser.role ? `${selectedUser.role}`.charAt(0).toUpperCase() + `${selectedUser.role}`.slice(1) : 'N/A'}</div>
          <div>Email: {selectedUser.email}</div>
          <div>
            Verified: <span className={`${selectedUser.is_verified ? 'text-green-700' : 'text-red-700'}`}>{selectedUser.is_verified.toString()}</span>
          </div>
          <button 
            onClick={() => verifyUser(selectedUser.id)}
            className={`px-4 py-1 mt-4 text-white rounded ${ selectedUser.is_verified ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-500'}`}
            >{selectedUser.is_verified ? 'Unverify' : 'Verify'}
          </button>
        </div>
    </div>
  )
}

export default AdminSeeUser