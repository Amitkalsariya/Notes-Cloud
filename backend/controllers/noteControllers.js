const AsyncHandler = require("express-async-handler");
const NOTE = require("../models/noteModel");

const getNotes = AsyncHandler(async (req, res) => {
  const notes = await NOTE.find({ user: req.user._id });
  res.json(notes);
});
const createNote = AsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Required All Feilds");
  } else {
    const note = new NOTE({ user: req.user._id, title, content, category });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  }
});

const getNoteById = AsyncHandler(async (req, res) => {
  const note = await NOTE.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not Found" });
  }
});

const updateNote = AsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await NOTE.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error("You can't able to Perform This Action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNot = await note.save();
    res.json(updatedNot);
  } else {
    res.status(404);
    throw new Error("Note Not Found");
  }
});

const deleteNote = AsyncHandler(async (req, res) => {
  const note = await NOTE.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error("You can't able to Perform This Action");
  }
  if (note) {
    await note.deleteOne();
    res.json({ message: "Note removed" });
  } else {
    res.status(404);
    throw new Error("Note Not Found");
  }
});

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
