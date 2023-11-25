const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const formsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: String, required: true },
    comments: [commentSchema] // Array of comment objects
});
const Forums = mongoose.model('forms', formsSchema);
module.exports = Forums;
