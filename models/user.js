const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    password: { type: String, required: true }



}, { timestamps: true });


export default mongoose.models.User || mongoose.model("User", UserSchema);