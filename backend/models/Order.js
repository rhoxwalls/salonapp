import mongoose from "mongoose";

const orderItemSchema: mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:"Product", require:true},
    name:{type:String, requiredd:true},
    unitPrice: {type:Number, requiredd:true},
    qty:{type:Number, required:true, min:1},
    subtotal:{type:Number, required:true},
},{_id:false});

const orderSchema = new mongoose.Schema{(
    tale:{type:mongoose.Schema.Types.ObjectId,ref:"Table", required:true},
)}