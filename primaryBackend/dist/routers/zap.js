"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
exports.zapRouter = (0, express_1.Router)();
exports.zapRouter.post("/", middleware_1.authMiddleware, (req, res) => {
    console.log("create zap");
});
exports.zapRouter.get("/", middleware_1.authMiddleware, (req, res) => {
    console.log("get zaps");
});
exports.zapRouter.get("/:zapId", middleware_1.authMiddleware, (req, res) => {
    console.log("get a particular zap");
});
