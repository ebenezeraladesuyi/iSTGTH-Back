import mongoose from "mongoose";

interface user {
  fullName: string;
  businessName : string;
  businessContact : string;
  businessServices : string;
  email: string;
  MembershipNumber: string;
  password : string
}

interface Iuser extends user, mongoose.Document {}

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "please enter your name"],
  },
  password: {
    type: String,
    required: [true, "please enter your name"],
  },
  businessName: {
    type: String,
    required: [true, "please enter your business name"],
  },
  businessServices: {
    type: String,
    required: [true, "please, enter business services"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
  },
  businessContact: {
    type: String,
    required: [true, "please enter your business Contact"],
  },
  MembershipNumber: {
    type: Number,
   
  },
 
});


const UserModel = mongoose.model<Iuser>("AllUsers" , userSchema)

export default UserModel