import { ReactElement } from "react";

interface ButtonProsps{
    variants:"primary" | "secondary";
    text:string;
    startIcon?:ReactElement,
    onClick ? : ()=>void,
    fullWidth?:boolean,
    loading?:boolean
  }


const buttonVariants={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-500"
}

const defaultStyle="px-4 py-2 rounded-md font-light flex items-center cursor-pointer"

const Button = (props:ButtonProsps) => {
  return (
    <button onClick={props.onClick} className={`${buttonVariants[props.variants]} ${defaultStyle} ${props.fullWidth ? "w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-45" : ""} `} disabled={props.loading}>
        <div className="pr-2">
          {props.startIcon} 
        </div>
        {props.text}
    </button>
  )
}

export default Button
