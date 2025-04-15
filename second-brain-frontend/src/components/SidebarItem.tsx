import { ReactElement } from "react"

const SidebarItem = ({text,icon}:{text:string, icon:ReactElement}) => {
  return (
    <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded transition-all">
       
      <div className="pr-4">{icon}</div>
      <div className="">{text}</div>
    </div>
  )
}

export default SidebarItem
