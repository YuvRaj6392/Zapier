import { Router } from "express";
import { authMiddleware } from "../middleware";

export const zapRouter = Router();

zapRouter.post("/", authMiddleware, (req, res) => {
  console.log("create zap");
});

zapRouter.get("/", authMiddleware, (req, res) => {
  console.log("get zaps");
});

zapRouter.get("/:zapId", authMiddleware, (req, res) => {
  console.log("get a particular zap");
});
