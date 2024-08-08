import mongoose, { mongo } from "mongoose";

const clientSchema = new mongoose.Schema({

    name: mongoose.Schema.Types.String,

    age: mongoose.Schema.Types.String,

    email: mongoose.Schema.Types.String,

    address:{type:mongoose.Schema.Types.ObjectId, ref:"Address"},


});

export const Client = mongoose.model("Client", clientSchema);