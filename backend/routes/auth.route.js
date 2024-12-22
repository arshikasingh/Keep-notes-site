import express from "express";
import { signup, signin, signout } from "../controller/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();
//ye signup and signout function controller mein banenge
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout, verifyToken);

export default router;
