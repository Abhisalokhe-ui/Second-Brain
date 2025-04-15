import axios from "axios"
import { useEffect, useState } from "react"
import { Backend_Url } from "../config"

const useContent = () => {
    const [content, setContent]=useState([])




    function refresh(){
        axios.get(`${Backend_Url}/api/v1/content`,{
            headers:{
                Authorization:`${localStorage.getItem("token")}`
            }
        }).then((res)=>{
            setContent(res.data.content)
        })
    }
    // we can create async function in useEffect so we have to use .then method
    useEffect(() => {
        refresh()

        const interval = setInterval(() => {
            refresh()
        }, 10 * 1000)

        return () => clearInterval(interval) // Correct cleanup
    }, [])

    return content
}

export default useContent
