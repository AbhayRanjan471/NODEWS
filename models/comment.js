//Creating Schema for COMMENT

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    //contains the comment text
    content: {
        type: String,
        required: true
    },
    //comment belong to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;