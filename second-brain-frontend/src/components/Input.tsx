
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Input=({ref, placeholder}:{ref?: any, placeholder:string})=>{
    return(
        <div>
            <input type={"text"} placeholder={placeholder} className="px-4 py-2 border rounded m-2" ref={ref}/>
        </div>
    )
}




