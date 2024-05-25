import { Model, Schema, model } from "mongoose"

interface AdminModalInterface{
    name?: string
    email?: string
    profilePhotp?:File
}

const AdminSchema = new Schema<AdminModalInterface>({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    profilePhotp:{
        data: Buffer,
        contentType: String,
        required:false,
    }
})

export default model("Admin", AdminSchema) as Model<
  AdminModalInterface
>;