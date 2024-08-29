import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token:string=req.headers.authorization as unknown as string;

  try{
  const payload=jwt.verify(token,JWT_PASSWORD)

   //@ts-ignore
    req.id=payload.id
    next()

  }catch(e){

    return res.status(403).json({
      msg:'You are not logged in'
    })
  }
  
};
