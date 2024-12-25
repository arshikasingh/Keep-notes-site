import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addNote,
  editNote,
  allNote,
  deleteNote,
  updatePinnedNote,
  searchNote,
} from "../controller/note.controller.js";
const router = express.Router();

router.post("/add", verifyToken, addNote);
router.post("/edit/:noteId", verifyToken, editNote);
router.get("/all", verifyToken, allNote);
router.delete("/delete/:noteId", verifyToken, deleteNote);
router.put("/update-note-pinned/:noteId", verifyToken, updatePinnedNote);
router.get("/search", verifyToken, searchNote);

export default router;
