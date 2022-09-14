//CREATING SCHEMA for POST

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    //1st field
    content: {
        type: String,
        required: true
    },
    //2nd field
    //whatever post we are creating is going to link to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //refer to User Schema
    }   
},{
    timestamps:true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;