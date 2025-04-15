import express,{ Request, Response }  from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

import dotenv from "dotenv"
dotenv.config()
const Port=process.env.PORT

const conn: string = process.env.MONGO_DB_URL ?? (() => { 
    throw new Error("MONGO_DB_URL is required but not defined!"); 
  })();

  

import z, { string } from "zod"
import { ContentModel, LinkModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors"
const app=express()
app.use(express.json())
app.use(cors())

const jwt_user_secret=process.env.JWT_SECRET


const userSchema = z.object({
    username:z.string().min(3).max(100),
    password:z.string().min(3).max(100)
})

app.post("/api/v1/signup", async (req: Request, res: Response): Promise<void>=>{

    try{
        const validation=userSchema.safeParse(req.body)
        if(!validation.success){
            res.status(400).send("Invalid data types")
        }

        const {username,password}=req.body
        console.log(username,password)
        const hashedPassword = await bcrypt.hash(password,5)

        const existingUser= await UserModel.findOne({
            username
        })

        if(existingUser){
            res.status(411).json({
                message:"Username is already exist"
            })
            return;
        }

        await UserModel.create({
            username,
            password:hashedPassword
        })

        res.json({
            username,
            password:hashedPassword
        })
    } catch(err){
        console.log("Error in Signup Endpoint => ",err)
        res.status(500).json({
            Error:"Internal Server Error"
        })
        return;
    } 
})


app.post("/api/v1/signin", async (req: Request, res: Response): Promise<void>=>{
  
try{
    const validation = userSchema.safeParse(req.body);
    if (!validation.success) {
         res.status(400).json({ message: "Invalid Data Types" });
         return
    }

    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
         res.status(400).json({ message: "User not found" });
         return
    }

    console.log("Stored Hashed Password:", user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
         res.status(401).json({ message: "Invalid credentials" });
         return
    }

    if(user && isPasswordValid){
        const token=jwt.sign({
            id:user._id.toString()
        },jwt_user_secret!)

        res.status(200).json({ 
            message: "Sign in successful",
            token
         });
    }

    

    } catch(err){
        console.error("Error in Signin Endpoint =>", err);
        res.status(500).json({ error: "Internal Server Error" });
    }

})


app.post("/api/v1/content", userMiddleware,async (req: Request, res: Response): Promise<void>=>{
   const link = req.body.link
   const type = req.body.type
   const title = req.body.title

   const allowedTypes = ['image', 'video', 'article', 'audio', 'youtube', 'twitter'];

   if (!allowedTypes.includes(type)) {
       res.status(400).json({ error: "Invalid content type. Allowed types are: image, video, article, audio." });
       return;
   }

   await ContentModel.create({
    link:link,
    type:type,
    title:title,
    //@ts-ignore
    userId:req.userId,
    tags:[]

   })

   res.json({
    message:"Content Added"
   })

})

app.get("/api/v1/content", userMiddleware, async (req: Request, res: Response): Promise<void>=>{
    //@ts-ignore
    const userId =req.userId
    const content = await ContentModel.find({
        userId
    }).populate("userId", "username");
    res.json({
        content
    })
})

app.delete("/api/v1/content",userMiddleware, async(req,res)=>{
   const contentId=req.body.contentId

   await ContentModel.deleteMany({
    contentId,
    //@ts-ignore
    userId:req.userId
   })

   res.json({
    message:"Data Deleted Successfully"
   })
})


app.post("/api/v1/brain/share",userMiddleware,async(req,res)=>{
    const share = req.body.share
    const hash =random(10)

    if(share){

        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId:req.userId
        })

        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
        }


        await LinkModel.create({
            //@ts-ignore
            userId:req.userId,
            hash: hash
        })

        res.json({
            message:"/share/" + hash
        })
    } else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId:req.userId,
        })
        res.json({
            message:"Removed Link"
        })
    }


    


})


app.post("/api/v1/brain/:shareLink",async (req,res)=>{
    const hash = req.params.shareLink

    const link=await LinkModel.findOne({
        hash
    })

    console.log("link=>",link)
    if(!link){
        res.status(411).json({
            message:"Incorrect Input"
        })
        return
    }

    const content = await ContentModel.find({
        userId:link.userId
    })


    console.log("content=>",content)
    const user = await UserModel.findOne({
        _id:link.userId
    })
    console.log("user=>",user)

    if(!user){
        res.status(411).json({
            message:"User not found"
        })
        return
    }


    res.json({
        username:user.username,
        content:content
    })
})





async function main(){
    console.log("inside main")
    console.log(conn)
    await mongoose.connect(conn)
    app.listen(3001)
    console.log("listeneing on port 3001")
    console.log("You can now use endpoints")
}

main()