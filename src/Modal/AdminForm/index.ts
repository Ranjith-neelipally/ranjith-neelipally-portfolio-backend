import { Model, Schema, model } from "mongoose"

interface AdminModalInterface{
    name?: string
    email?: string
    profilePhoto?:string
}

const AdminSchema = new Schema<AdminModalInterface>({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    profilePhoto:{
        type:String,
        trim:true,
    }
})

export default model("Admin", AdminSchema, "Admin") as Model<
  AdminModalInterface
>;