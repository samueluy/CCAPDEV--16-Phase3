/* DONE */ 

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, trim: true},
    username: {type: String, trim: true},
    email: {type: String, trim: true},
    password: {type: String, trim: true},
    school: {type: String, trim: true},
    profilePic:{type:String},
    bio:{type:String}
});

const User = mongoose.model('User', UserSchema);

export default User;