import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({

    prodName: mongoose.Schema.Types.String,

    price: mongoose.Schema.Types.String,

});

export const Product = mongoose.model("Product", UserSchema);