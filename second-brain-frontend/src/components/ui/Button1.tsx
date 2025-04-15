import { ReactElement } from "react";

type Variant="primary" | "secondary"
interface ButtonProps{
    variant: Variant;
    size : "sm" | "md" | "lg";
    text : string;
    startIcon? : ReactElement;
    endIcon? : ReactElement;
    onClick? : () => void;
}

const variantStyles={
  "primary":"bg-purple-600 text-white",
  "secondary":"bg-purple-300 text-purple-600"
}

const defaultStyles="flex items-center m-2"

const sizeStyles={
  "sm":"py-1 px-2 text-sm rounded-sm",
  "md":"py-2 px-4 text-md rounded-md",
  "lg":"py-4 px-6 text-lg rounded-lg",
}


const Button1 = ( props : ButtonProps) => {
    
 
  return (
   
        <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
          {props.startIcon ?  <div className="pr-2">{props.startIcon}</div> : null} {props.text}
        </button>

    );
  };
  
export default Button1;
  
