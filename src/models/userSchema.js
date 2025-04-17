import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must be at least 6 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters long'],
    },
},
{ timestamps: true });

const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;
