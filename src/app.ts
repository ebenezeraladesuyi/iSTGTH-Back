import express, { Application , Request , Response } from "express";
import cors from "cors";
import userRouter from "./routes/UserRouter";


const appConfig = (app: Application) => {
  app.use(express.json()).use(cors());

  //routes
  app.use("/users" , userRouter)

  app.get("/" , (req: Request , res:Response)=>{
    return res.status(200).json({
      message : "default get"
    })
  })
};



export default appConfig