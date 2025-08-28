import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type:String, required:true, unique: true},
    password: {type:String, required:true},
    role:{type:String, enum: ["admin","mozo"], default:"mozo"},
}, {timestamps:true});

export default mongoose.model("User",userSchema);