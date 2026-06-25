import Note from "../models/notes.js";

// logic get all notes 
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user_id: req.user.id });
        return res.status(200).json(notes);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// logic create note 
export const createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = await Note.create({ title, content, user_id: req.user.id });
        return res.status(201).json(newNote);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// logic update note
export const updateNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const existingNote = await Note.findOne({ _id: req.params.id, user_id: req.user.id });
        if (!existingNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        existingNote.title = title || existingNote.title;
        existingNote.content = content || existingNote.content;

        const updatedNote = await existingNote.save();
        return res.status(200).json(updatedNote);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// logic delete note    
export const deleteNote = async (req, res) => {
    try {
        const existingNote = await Note.findOne({ _id: req.params.id, user_id: req.user.id });
        if (!existingNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        await existingNote.deleteOne();
        return res.status(200).json({ message: "Note removed" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
