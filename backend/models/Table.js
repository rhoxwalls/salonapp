import mongoose from "mongoose";

const tableSchema = mongoose.Schema({
    number:{type:Number, require:true, unique:true},
    status:{type:String, enum["free","occupied"], default:true},
    waiter:{type:mongoose.Schema.Types.ObjectId, ref:"User", default:null},
    currentOrder:{type:mongoose.Schema.Types.ObjectId, ref:"Order", default:null},
    openedAt:{type:Date, default:null},
},{timestamps:true});

export default mongoose.model("Table",tableSchema);