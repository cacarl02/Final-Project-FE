import React, { useState } from 'react'

function UserEditForm(props) {
    const { userData, loginToken } = props
    const [firstname, setFirstname] = useState(`${userData.firstname}`);
    const [lastname, setLastname] = useState(`${userData.lastname}`);
    const [image, setImage] = useState(userData.photo_data);
    const [role, setRole] = useState(`${userData.role}`.charAt(0).toUpperCase() + `${userData.role}`.slice(1));

    const [fetchedMessage, setFetchedMessage] = useState('')

    const formSubmit = async (id) => {
        try{
            const response = await fetch (`http://localhost:3001/users/${id}`, {
                method : "PATCH",
                headers : {
                    "Content-type": "application/json",
                    "Authorization" : `${loginToken}`
                }
            })
            const data = await response.json()
            setFetchedMessage(data.message)
        }
        catch(error){
            console.error(error)
        }
    }

    const UserForm = () => {
        return(
            <form onSubmit={formSubmit}>
                <label htmlFor="firstname">First Name:</label>
                <input 
                    type="text"
                    id="firstname"
                    name='firstname'
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <label htmlFor="lastname">Last Name:</label>
                <input 
                    type="text"
                    id="lastname"
                    name='lastname'
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <label htmlFor="image">Photo:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="role">Role: </label>
                <select
                    id="role"
                    name='role'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="">Select a Role</option>
                    <option value="operator">Operator</option>
                    <option value="commuter">Commuter</option>
                </select>
            </form>
        )
    }
  return (
    <>
        <UserForm />
    </>
  )
}

export default UserEditForm