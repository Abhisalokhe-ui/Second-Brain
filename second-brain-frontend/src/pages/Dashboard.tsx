import CreateContentModal from "../components/CreateContentModal"
import Sidebar from "../components/Sidebar"
import Button from "../components/Button"
import { PlusIcon } from "../icons/PlusIcon"
import ShareIcon from "../icons/ShareIcon"
import Card from "../components/Card"
import { useState } from "react"
import useContent from "../hooks/useContent"
import axios from "axios"
import { Backend_Url } from "../config"

const Dashboard = () => {
  


      const [modalOpen, setModalOpen] = useState(false)
      const content = useContent()

    return (
        <div>
          <Sidebar />
          <div className="p-4 ml-72 bg-gray-200 h-screen">
            <div  bg-gray-200 h-screen>
              <CreateContentModal open={modalOpen} onClose={()=>{
                setModalOpen(false)
              }}/>
    
              <div className="flex justify-end gap-4">
                <Button onClick={()=>{
                  setModalOpen(true)
                }} variants="primary" text="Add Content" startIcon={<PlusIcon />}/>


                <Button
                  onClick={async()=>{

                    console.log("inside share")

                    const res=await axios.post(`${Backend_Url}/api/v1/brain/share`,{
                      share:true
                    },{
                      headers:{
                        Authorization:localStorage.getItem("token")
                      }
                    })

                    console.log(res.data.hash)
                    const sharedUrl= `http://localhost:5173/share/${res.data.hash}`

                    alert(sharedUrl)
                  }}
                variants="secondary" text="Share Brain" startIcon={<ShareIcon />}/>
              </div>
    
              <div className="flex flex-wrap gap-4">

              {content.map(({ type, title, link }) => 
                <Card 
                      title={title} 
                      link={link} 
                      type={type} />
              )}


                {/* <Card  title="First post" link="https://x.com/maharaaj_g/status/1906591724505546894" type="twitter"/>
                <Card  title="First video" link="https://www.youtube.com/watch?v=Ro9i0OrcDgI" type="youtube"/> */}


              </div>
            
            
            </div>
          </div>
        </div>
      )
}

export default Dashboard
