const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    orderid: { type: String, required: true },
    email: { type: String },
    orderinfo: { type: Object, required: true },
    items: { type: Object, required: true },
    totalprice: { type: Number, required: true },
    deliverystatus: { type: String, default: "Processing" },
    paymentstatus: { type: String, default: "unpaid" },

}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);