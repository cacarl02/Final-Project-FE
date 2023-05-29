import { useState, useEffect } from "react"
import FlashMessage from "../utilities/FlashMessage"
import AdminSeeUser from "./AdminSeeUser"


const Admin = (props) => {
    const { loginToken } = props
    const [userList, setUserList] = useState([])
    const [fetchMessage, setFetchMessage] = useState('')

    const [seeUser, setSeeUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState('')
    const getUserList = async() => {

        try{
            const response = await fetch ('http://localhost:3001/users', {
                method : "GET",
                headers : {
                    "Content-type" : "application/json",
                    "Authorization" : `${loginToken}`
                }
            })
            const usersData = await response.json()
            setUserList(usersData)

        }
        catch(error){
            console.error(error)
        }
    }


    const verifyUser = async(id) => {
        try{
            const response = await fetch (`http://localhost:3001/admin/${id}/verify_user`, {
                method : "PATCH",
                headers : {
                    "Content-type": "application/json",
                    "Authorization" : `${loginToken}`
                }
            })
            const patchMessage = await response.json()
            setFetchMessage(patchMessage.message)
            getUserList()
            setSeeUser(false)
        }
        catch(error){
            console.error(error)
        }
    }
    useEffect(() => {
        getUserList();
      }, []); 

    const getSelectedUser = (obj) => {
        setSelectedUser(obj)
        setSeeUser(true)
    }

    const Users = () => {
        return(
            <>
                <div>
                    <div class="flex justify-center">
                        <table className="divide-y divide-gray-500">
                            <thead className="bg-gray-800">
                                <tr>
                                <th className="py-2 px-4 text-left font-medium text-gray-400">ID</th>
                                <th className="py-2 px-4 text-left font-medium text-gray-400">Email</th>
                                <th className="py-2 px-4 text-left font-medium text-gray-400">Verified</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-600">
                                {userList && userList.length ? (
                                userList.map((obj) => (
                                    <tr key={obj.id} onClick={() => getSelectedUser(obj)} className="cursor-pointer">
                                        <td className="py-2 px-4 font-medium text-gray-400">{obj.id}</td>
                                        <td className="py-2 px-4 font-medium text-gray-400">{obj.email}</td>
                                        <td className={`py-2 px-4 font-medium ${obj.is_verified ? 'text-green-700' : 'text-red-700'}`}>{obj.is_verified.toString()}</td>
                                    </tr>
                                ))
                                ) : (
                                <tr>
                                    <td colSpan="4" className="py-4 px-4 text-gray-400 text-center">
                                    No users yet.
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
    return(
        <>
            <Users />
            <FlashMessage fetchMessage={fetchMessage} />
            {seeUser && <AdminSeeUser
                selectedUser={selectedUser}
                verifyUser={verifyUser}
            />}
        </>
    )
}

export default Admin;