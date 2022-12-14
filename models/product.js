const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    disc: { type: String, },
    user: { type: String, required: true }

}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);