const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    message: { type: String, required: true }



}, { timestamps: true });

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);