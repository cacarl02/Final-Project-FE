import React, { useEffect, useState } from 'react'
import './utilities.css'

const FlashMessage = (props) => {
    const { fetchMessage } = props
    const [flash, setFlash] = useState(false)

    useEffect(()=> {
        setFlash(true)
        const timeout = setTimeout(() => {
            setFlash(false)
        }, 3000)

        return () => clearTimeout(timeout)
    }, [fetchMessage])
    return(
        <div className={`bg-green-500 py-2 px-4 rounded-md mb-4 ${flash ? 'opacity-100 animate-flash' : 'opacity-0'}`}>
            {fetchMessage}
        </div>
    )
}
export default FlashMessage