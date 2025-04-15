import { useRef } from "react"
import Button from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios"
import { Backend_Url } from "../config"
import { useNavigate } from "react-router-dom"


const Signin = () => {

  const usernameRef = useRef<any>()
  const passwordRef = useRef<any>()
  const navigate =useNavigate()
  async function signin(){
    const username=usernameRef.current?.value;
    const password=passwordRef.current?.value;

    const response=await axios.post(`${Backend_Url}/api/v1/signin`,{
      username,
      password
    })

    const jwt = response.data.token

    localStorage.setItem("token",jwt)

    navigate("/dashboard")
   
  }


  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 justify-center p-8">
            <Input  ref={usernameRef} placeholder="Username" />
            <Input  ref={passwordRef} placeholder="Password" />

            <div className="flex  justify-center pt-4">
                <Button text="Signin" variants="primary" fullWidth={true}  onClick={signin}/>
            </div>
        </div>
    </div>
  )
}

export default Signin
