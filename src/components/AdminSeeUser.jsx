import React from 'react'

const AdminSeeUser = (props) => {
    const { selectedUser, loginToken, verifyUser } = props

    const formattedDate = new Date(selectedUser.created_at).toLocaleDateString()
  return (
    <div>
        <div>{selectedUser.id}</div>
        <div>{selectedUser.email}</div>
        <div>{selectedUser.firstname}</div>
        <div>{selectedUser.lastname}</div>
        {selectedUser.role && <div>{selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}</div>}
        <div>{selectedUser.balance}</div>
        <div>{selectedUser.photo_data}</div>
        <div>{formattedDate}</div>
        <div>{selectedUser.is_verified}</div>
        <button onClick={() => verifyUser(selectedUser.id)}>{selectedUser.is_verified ? 'Unverify' : 'Verify'}</button>
    </div>
  )
}

export default AdminSeeUser