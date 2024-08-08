import mongoose, { mongo } from "mongoose";

const addressSchema = new mongoose.Schema({

    street: mongoose.Schema.Types.String,

    city: mongoose.Schema.Types.String,

    zip: mongoose.Schema.Types.String,

});

export const Address = mongoose.model("Address", addressSchema);