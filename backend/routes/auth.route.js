import express from 'express';
import {signup} from "../controller/auth.controller.js"
const router = express.Router();
//ye signup and signout function controller mein banenge 
router.post("/signup", signup);
// router.post("/signin", signin);
export default router 