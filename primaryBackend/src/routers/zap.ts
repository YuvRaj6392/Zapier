import { Router } from "express";
import { authMiddleware } from "../middleware";
import { zapCreateSchema } from "../types";
import { prismaClient } from "../db";

export const zapRouter = Router();

zapRouter.post("/", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const parsedData = zapCreateSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(411).json({
      msg: "Incorrect input",
    });
  }

  const zapId= await prismaClient.$transaction(async (tx) => {
    const zap = await prismaClient.zap.create({
      data: {
        userId: parseInt(id),
        triggerId: "",
        actions: {
          create: parsedData.data.actions.map((x, index) => ({
            actionId: x.actionId,
            sortingOrder: index,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        availableTriggerId: parsedData.data.availableTriggerId,
        zapId: zap.id,
      },
    });

    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });

    return zap.id
  });

  return res.json({
    zapId
  })

});

zapRouter.get("/", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const zaps = await prismaClient.zap.findMany({
    where: {
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger:{
        include:{
          type:true
        }
      }
    },
  });
  res.json({
    zaps,
  });
});

zapRouter.get("/:zapId", authMiddleware, async (req, res) => {
   //@ts-ignore
  const id = req.id;
  const zapId=req.params.zapId
  const zaps = await prismaClient.zap.findFirst({
    where: {
      id:zapId,
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger:{
        include:{
          type:true
        }
      }
    },
  });
  res.json({
    zaps,
  });
});
