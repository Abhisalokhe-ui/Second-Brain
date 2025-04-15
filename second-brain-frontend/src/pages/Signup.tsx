import Button from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios"
import { Backend_Url } from "../config"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

const Signup = () => {

  const usernameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const navigate = useNavigate()

  async function signup(){
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    console.log(username,password)
    await axios.post(`${Backend_Url}/api/v1/signup`, {
      username,
      password
    })
    alert("You have signed up")

    navigate("/signin")

  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 justify-center p-8">
            <Input placeholder="Username" ref={usernameRef}/>
            <Input placeholder="Password" ref={passwordRef}/>

            <div className="flex  justify-center pt-4">
                <Button text="Signup" variants="primary" fullWidth={true}  onClick={signup}/>
            </div>
        </div>
    </div>
  )
}

export default Signup
