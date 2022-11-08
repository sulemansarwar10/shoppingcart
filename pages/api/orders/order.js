import Order from "../../../models/order"
import connectDb from "../../../middleware/mongoose"


const handler = async (req, res) => {
    const id = req.body
    let Order = await Order.find({ orderid: id })
    return res.status(200).json({ success: true, Order })

}

export default connectDb(handler)

