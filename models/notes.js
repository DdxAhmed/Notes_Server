import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, ''],
        trim: true
    },
    content: {
        type: String,
        required: [true, '']
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const Note = mongoose.model('Note', NoteSchema);
export default Note;