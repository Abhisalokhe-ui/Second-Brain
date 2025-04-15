import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";
const jwt_user_secret=process.env.JWT_SECRET


export const userMiddleware =(req:Request, res:Response, next:NextFunction)=>{
    const header = req.headers["authorization"]
    const decoded = jwt.verify(header as string, jwt_user_secret as string)
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id
        next()
    } else{
        res.status(403).json({
            message:"You are not logged in"
        })
    }
}