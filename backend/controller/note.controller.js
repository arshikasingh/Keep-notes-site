import { errorHandler } from "../utils/error.js";
import Note from "../models/note.model.js";

//for adding note
export const addNote = async (req, res, next) => {
  const { title, content, tags } = req.body;
  const { id } = req.user;
  if (!title) {
    return next(errorHandler(400, "Title is required"));
  }
  if (!content) {
    return next(errorHandler(400, "Content is required"));
  }
  try {
    //creating a new note

    const newNote = new Note({
      title,
      content,
      tags: tags || [],
      userId: id,
    });

    await newNote.save();

    res.status(201).json({
      success: true,
      message: "Successfully added new note",
      newNote,
    });
  } catch (err) {
    return next(err);
  }
};

//for editing note
export const editNote = async (req, res, next) => {
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    return next(errorHandler(404, "Note not found"));
  }
  if (req.user.id !== note.userId) {
    return next(errorHandler(401, "You can only update your own note"));
  }

  const { title, content, tags, isPinned } = req.body;
  if (!title && !content && !tags) {
    return next(errorHandler(404, "No Chnages provided"));
  }
  try {
    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (tags) {
      note.tags = tags;
    }
    if (isPinned) {
      note.isPinned = isPinned;
    }
    await note.save();
    res.status(200).json({
      success: true,
      message: "succesfully edited",
      note,
    });
  } catch (err) {
    return next(err);
  }
};

//to get all notes
export const allNote = async (req, res, next) => {
  const userId = req.user.id; //to show only log in user their notes
  try {
    const notes = await Note.find({ userId: userId }).sort({ isPinned: -1 }); //it means that pinned notes will appears first i.e descending order
    res.status(200).json({
      success: true,
      message: "Fetched all notes with respective thei user id",
      notes,
    });
  } catch (err) {
    return next(err);
  }
};

//ye ek tareek hai jab ban jaye poora toh edit wale way se karenge delete ko
export const deleteNote = async (req, res, next) => {
  const noteId = req.params.noteId; //ye params se milegi
  const note = await Note.findOne({ _id: noteId, userId: req.user.id });
  if (!note) {
    return next(errorHandler(404, "No Note id found"));
  }
  try {
    await Note.deleteOne({ _id: noteId, userId: req.user.id });
    res.status(200).json({
      success: true,
      message: "Successfully deleted the note",
    });
  } catch (err) {
    return next(err);
  }
};
export const updatePinnedNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  const note = await Note.findOne({ _id: noteId, userId: req.user.id });
  if (!note) {
    return next(errorHandler(404, "No Note id found"));
  }
  try {
    const { isPinned } = req.body;
    note.isPinned = isPinned;

    await note.save();
    res.status(200).json({
      success: true,
      message: "Note updated pinned seuccessfully",
      note,
    });
  } catch (err) {
    return next(err);
  }
};

export const searchNote = async (req, res, next) => {
  //we search on the basis of title and content
  //query param ? it is a query param
  //$or it is a operator in mongodb  which means either orthat i here indicates case insensitive
  const { query } = req.query;
  if (!query) {
    return next(errorHandler(400, "Bad request. Please give the search query"));
  }

  try {
    const matchedNotes = await Note.find({
      userId: req.user.id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });
    res.status(200).json({
      success: true,
      message: "Successfully fecthced",
      matchedNotes,
    });
  } catch (err) {
    return next(err);
  }
  const { title } = req.body;
};
