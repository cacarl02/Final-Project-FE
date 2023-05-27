import { useState, useEffect } from "react"
import FlashMessage from "../utilities/FlashMessage"


const Admin = (props) => {
    const { loginToken } = props
    const [userList, setUserList] = useState([])
    const [fetchMessage, setFetchMessage] = useState('')
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
            console.log(fetchMessage)
            getUserList()
        }
        catch(error){
            console.error(error)
        }
    }
    useEffect(() => {
        getUserList();
      }, []); 

    const Users = () => {
        return(
            <>
                {
                    userList && userList.length ? userList.map((obj) => 
                    (
                        <div className="flex empty" key={obj.id}>
                            <div>{obj.id}</div>
                            <div>{obj.role}</div>
                            <div>{obj.email}</div>
                            <div>{obj.is_verified.toString()}</div>
                            <button onClick={() => verifyUser(obj.id)}>{obj.is_verified ? 'Unverify' : 'Verify'}</button>
                        </div>
                    ))
                    : <div>No users yet.</div>
                }
            </>
        )
    }
    return(
        <>
            <Users />
            <FlashMessage fetchMessage={fetchMessage} />
        </>
    )
}

export default Admin;