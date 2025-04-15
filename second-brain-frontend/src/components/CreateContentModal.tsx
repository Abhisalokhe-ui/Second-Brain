import { useRef, useState } from "react"
import CrossIcon from "../icons/CrossIcon"
import Button from "./Button"
import { Input } from "./Input"
import { Backend_Url } from "../config"
import axios from "axios"


enum ContentType {
    YouTube ="youtube",
    Twitter ="twitter"
}



const CreateContentModal = ({open,onClose}) => {
    
    const titleRef =useRef<any>()
    const linkRef =useRef<any>()
    const [type, setType] = useState(ContentType.YouTube)

    async function addContent() {
        const title=titleRef.current?.value
        const link=linkRef.current?.value
        const token = localStorage.getItem("token");
      

        console.log(title,link,token)
        await axios.post(`${Backend_Url}/api/v1/content`,{
            link,
            type,
            title
        },{
            headers:{
                "Authorization":token
            }
        })
        alert("done")
        onClose()

    }


    return (
        <div>
              { open && <div>
              
                <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-70 flex justify-center">
                    
                </div>


                <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0  flex justify-center">
                    <div className="flex flex-col justify-center">

                    
                        <span className="bg-white opacity-100 p-4 rounded">
                           <div className="flex justify-end">
                                <div onClick={onClose} className="cursor-pointer">
                                    <CrossIcon />
                                </div>
                           </div>
                           <div>
                                <Input placeholder={"Title"} ref={titleRef}/>
                                <Input placeholder={"Link"} ref={linkRef}/>
                           </div>

                            <div>
                                <h1>Types</h1>
                                <div className="flex gap-1 p-4">
                                    <Button text="Youtube" variants={type=== ContentType.YouTube ?  "primary" : "secondary"} onClick={()=>{
                                        setType(ContentType.YouTube)
                                    }} />


                                    <Button text="Twitter" variants={type=== ContentType.Twitter ? "primary" : "secondary"} onClick={()=>{
                                        setType(ContentType.Twitter) 
                                    }} />
                                </div>
                               


                            </div>


                            <div className="flex justify-center">
                                <Button variants="primary" text="Submit" onClick={addContent}/>
                            </div>
                        </span>
                    </div>    
           </div>
              
              </div>}
        </div>
      
    )
}

export default CreateContentModal



