const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    message: { type: String, required: true }



}, { timestamps: true });
mongoose.models={}
export default mongoose.model("Feedback", FeedbackSchema);