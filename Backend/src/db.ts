import mongoose from "mongoose";
import { Schema, Types } from "mongoose";




const UserSchema = new Schema({
    username : {type:String, unique:true},
    password: String
})
export const UserModel = mongoose.model("user",UserSchema)


const contentTypes = ['image', 'video', 'article', 'audio', 'youtube', 'twitter']; // Extend as needed
const ContentSchema = new Schema({
    link : { type:String, required:true },
    type : { type:String, enum :contentTypes, required:true },
    title : { type:String, required:true },
    tags : [{ type:Types.ObjectId, ref:'Tags'}],
    userId : { type:Types.ObjectId, ref:'user', required:true }
})
export const ContentModel = mongoose.model("content",ContentSchema)


const LinkSchema = new Schema({
    hash : String,
    userId : { type:Types.ObjectId, ref:'user', required:true, unique:true}
})
export const LinkModel = mongoose.model("links",LinkSchema)

