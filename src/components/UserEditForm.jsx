import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function UserEditForm(props) {
    const { settingsData, loginToken, setUserFormPopup, setUserData, userData } = props
    const [firstname, setFirstname] = useState(`${settingsData.firstname}`);
    const [lastname, setLastname] = useState(`${settingsData.lastname}`);
    const [role, setRole] = useState(`${settingsData.role}`);
    
    const [fetchedMessage, setFetchedMessage] = useState('')
    
    const [image, setImage] = useState(`${settingsData.photo_data}`);
    const [previewUrl, setPreviewUrl] = useState('');

    const handleImageChange = (event) => {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
  
      if (selectedImage) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(selectedImage);
      }
    };
    
    const formSubmit = async (e) => {
        e.preventDefault()
        
        const formData = new FormData();
        formData.append('avatar', image);
        
        try{
            const response = await fetch (`https://final-project-app.onrender.com/users/${userData.id}`, {
                method : "PATCH",
                headers : {
                    "Content-type": "application/json",
                    "Authorization" : `${loginToken}`
                },
                body: formData
            })
        }
        catch(error){
            console.error(error)
        }

        try{
      
            const response = await fetch (`https://final-project-app.onrender.com/users/${userData.id}`, {
                method : "PATCH",
                headers : {
                    "Content-type": "application/json",
                    "Authorization" : `${loginToken}`
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    role: role
                })
            })
            const data = await response.json()
            setFetchedMessage(data.message)
            setUserData(data.user)
            setUserFormPopup(data.message ? false : true)
        }
        catch(error){
            console.error(error)
        }
    }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
        <form onSubmit={formSubmit} className='p-10 bg-gray-50 dark:bg-gray-700 m-5 rounded-lg shadow text-white flex flex-col relative'>
            <button 
                type='button'
                onClick={() => setUserFormPopup(false)}
                className='absolute top-2 right-2 text-2xl hover:text-gray-400'><AiOutlineClose /></button>
            <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name:</label>
            <input 
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
            <label 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name:</label>
            <input 
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'                                    
            />
            <label 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo:</label>
            <input
                type="file"
                multiple={false}
                onChange={handleImageChange}
            />
            {
                previewUrl && (
                    <div>
                      <img
                        alt="not found"
                        width={"250px"}
                        value={image}
                        src={previewUrl}
                      />
                      <br />
                      <button onClick={() => setImage(null)}>Remove</button>
                    </div>
                )
            }
            <label 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role: </label>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
                <option value="">Select a Role</option>
                <option value="operator">Operator</option>
                <option value="commuter">Commuter</option>
            </select>
            <button type='submit' className='w-full mt-4 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Update</button>
        </form>
    </div>
  )
}

export default UserEditForm