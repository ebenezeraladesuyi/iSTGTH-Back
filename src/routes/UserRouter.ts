import express from "express"
import { getAllUsers, getOneUser, newUser, signin, updateUser, searchUser } from "../controller/UserController"

const userRouter = express.Router()

userRouter.get("/" , getAllUsers)
userRouter.get("/:userId" , getOneUser)
userRouter.post("/signup", newUser)
userRouter.post("/signin", signin)
userRouter.patch("/update", updateUser)
userRouter.post("/searchuser", searchUser)


export default userRouter