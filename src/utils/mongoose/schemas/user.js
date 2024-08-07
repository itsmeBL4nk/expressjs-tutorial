import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({

    username:{
        type: mongoose.Schema.Types.String,
        required:true,
        unique: true,
    },
    displayName: mongoose.Schema.Types.String,
    age: mongoose.Schema.Types.String,

    password:{
        type: mongoose.Schema.Types.String,
        required:true,
        unique: true,
    },


    // username: mongoose.Schema.Types.String,
    // displayName: mongoose.Schema.Types.String,
    // password: mongoose.Schema.Types.String,
    // 

});

export const User = mongoose.model("User", UserSchema);