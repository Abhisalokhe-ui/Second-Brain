import ShareIcon from "../icons/ShareIcon"

interface CardProps{
    title:string,
    link:string,
    type:"twitter" | "youtube"
}

const Card = (props:CardProps) => {
  return (
    <div className=" p-4 bg-white rounded-md  border border-gray-300 max-w-72 min-h-48 min-w-72">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
              <div className="pr-2 text-gray-500">
                <ShareIcon />
              </div>
              {props.title}
          </div>
          <div className="flex items-center">
              <div className="pr-2 text-gray-500">
                <a href={props.link} target="_blank"><ShareIcon /></a>  
                
              </div>
              <div className="pr-2 text-gray-500">
                <ShareIcon />
              </div>          
          </div>
        </div>

        <div className="pt-5">
          { props.type === "youtube"  && <iframe className="w-full" src={props.link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }

          {props.type === "twitter"  && <blockquote className="twitter-tweet"> <a href={props.link.replace("x.com","twitter.com")}></a></blockquote>} 
        </div>

      
    </div>
  )
}

export default Card
