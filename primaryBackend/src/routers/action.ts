import { Router } from "express";
import { prismaClient } from "../db";
import { authMiddleware } from "../middleware";

export const actionRouter = Router();

actionRouter.get("/available", authMiddleware, async (req, res) => {
  const availableActions = await prismaClient.availableAction.findMany({});
  res.json({
    availableActions,
  });
});
