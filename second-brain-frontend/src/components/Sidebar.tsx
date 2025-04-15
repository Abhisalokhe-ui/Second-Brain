import Brainly from "../icons/Brainly"
import TwitterIcon from "../icons/TwitterIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import SidebarItem from "./SidebarItem"


const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-white border-r-2  border-gray-300 fixed left-0 top-0 pl-4">
      <div className="flex text-2xl pt-4 items-center">      
        <div className="pr-4 text-purple-600">
          <Brainly /> 
        </div>
        Brainly
        
      </div>  
      <div className="pt-8 ">
          <SidebarItem text="Twitter" icon={<TwitterIcon />} />
          <SidebarItem text="YouTube" icon={<YoutubeIcon />} />
      </div>
    </div>
  )
}

export default Sidebar
