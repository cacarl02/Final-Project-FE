import e from 'cors';
import React, { useState } from 'react'

function UserEditForm(props) {
    const { userData, loginToken, setUserFormPopup } = props
    const [firstname, setFirstname] = useState(`${userData.firstname}`);
    const [lastname, setLastname] = useState(`${userData.lastname}`);
    const [image, setImage] = useState(userData.photo_data);
    const [role, setRole] = useState(`${userData.role}`);

    const [fetchedMessage, setFetchedMessage] = useState('')

    const formSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch (`http://localhost:3001/users/${userData.id}`, {
                method : "PATCH",
                headers : {
                    "Content-type": "application/json",
                    "Authorization" : `${loginToken}`
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    image: image,
                    role: role
                })
            })
            const data = await response.json()
            setFetchedMessage(data.message)
            setUserFormPopup(fetchedMessage ? false : true)
            console.log(fetchedMessage)
        }
        catch(error){
            console.error(error)
        }
    }

  return (
    <>
        <form onSubmit={formSubmit}>
            <label htmlFor="firstname">First Name:</label>
            <input 
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
            />
            <label htmlFor="lastname">Last Name:</label>
            <input 
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
            />
            <label htmlFor="image">Photo:</label>
            <input
                type="file"
                value={image}
                onChange={(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="role">Role: </label>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="">Select a Role</option>
                <option value="operator">Operator</option>
                <option value="commuter">Commuter</option>
            </select>
            <button type='submit'>Update</button>
        </form>
    </>
  )
}

export default UserEditForm