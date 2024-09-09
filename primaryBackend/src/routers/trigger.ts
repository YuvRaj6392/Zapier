import { Router } from "express";
import { authMiddleware } from "../middleware";
import { prismaClient } from "../db";

export const triggerRouter=Router();

triggerRouter.get('/available',authMiddleware,async(req,res)=>{
  const availableTriggers=await prismaClient.availableTrigger.findMany({});
  res.json({
    availableTriggers
  })
})