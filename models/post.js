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
        type: mongoose.Schema.Types.ObjectId, //id
        ref: 'User' //refer to User Schema
    },  
    //include the array of ids of all the commnets in this post schema itself
    comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment' //refer to comment Schema
        } 
    ]
},{
    timestamps:true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;