
/* DONE */ 

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    name: {type: String, trim: true},
    username: {type: String, trim: true},
    content: {type: String, trim: true},
    school: {type: String, trim: true},
    date: {type: String},
    img: {type:String},
    profilePic: {type:String}
});

const Post = mongoose.model('Post', PostSchema);

export default Post;