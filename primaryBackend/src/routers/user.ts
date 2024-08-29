import { Router } from "express";
import { authMiddleware } from "../middleware";
import { signInSchema, signupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const parsedData = signupSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(411).json({
      msg: "Incorrect input",
    });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (userExists) {
    return res.status(403).json({
      msg: "User exists",
    });
  }

  await prismaClient.user.create({
    data: {
      name: parsedData.data.name,
      //Dont add password in plain text
      email: parsedData.data.email,
      password: parsedData.data.password,
    },
  });

  return res.json({
    msg: "Please verify your account by opening email!",
  });
});

userRouter.post("/signin", async (req, res) => {
  const parsedData = signInSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(411).json({
      msg: "Incorrect input",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    return res.status(403).json({
      msg: "Sorry credentials are incorrect",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );

  res.json({
    token:token
  })

});

userRouter.get("/user", authMiddleware, async (req, res) => {
  //fix the type
  //@ts-ignore
  const id=req.id 
  const user= await prismaClient.user.findFirst({
    where:{
      id
    },
    select:{
      name:true,
      email:true
    }
  })

  return res.json({
    user
  })
});
