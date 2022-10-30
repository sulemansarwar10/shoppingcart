import Order from "../../../models/order"
import connectDb from "../../../middleware/mongoose"


const handler = async (req, res) => {
    const email = req.body
    let Orders = await Order.find({ email: email })
    console.log(email, req.body, Orders)

    return res.status(200).json({ success: true, Orders })

}

export default connectDb(handler)

