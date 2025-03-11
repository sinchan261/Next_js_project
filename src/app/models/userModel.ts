import mongoose from "mongoose"
const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:[true,"please provides a username"],
    unique:true,
  },
  password:{
    type:String,
    required:[true,"please provides a password"],
    unique:true
  },
  email:{
    type:String,
  required:[true,"please provides a email"],
  unique:true
  },
 isVerified:{
    type:Boolean,
    defualt:false
 },
 isAdmin:{
    type:Boolean,
    default:false,
 },
 forgotPasswordToken:String,
 forgotPasswordTokenExpiry:String,
 verifyToken:String,
 verifyTokenExpiry:Date,
})
const User=mongoose.models.users||mongoose.model("users",userSchema);
export default User;