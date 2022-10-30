import Product from "../../models/product";
import User from "../../models/user";
import connectDb from "../../middleware/mongoose"
import Order from "../../models/order";
const jwt = require('jsonwebtoken');


const handler = async (req, res) => {

    if (req.method === 'POST') {
        let email = ""
        const { items, totalitems, subtotal, orderinfo, token } = req.body
        let keys = Object.keys(items)
        let sumtotal = 0
        let products = await Product.find({ name: keys })

        for (let i = 0; i < keys.length; i++) {
            let product = await Product.findOne({ name: keys[i] })
            sumtotal = sumtotal + product.price * items[keys[i]].qty
            if (items[keys[i]].price != product.price) {
                return res.status(401).send({ success: false, msg: "Some values of items has been changed, Try again!" })
            }
        }
        if (sumtotal != subtotal) {
            return res.status(401).send({ success: false, msg: "Some values of items has been changed, Try again!" })
        }
        else {

            try {
                if (token) {
                    const data = await jwt.verify(token, process.env.JWT_SECRET);
                    email = data.user.email
                }
                else if (!await User.findOne({ email: orderinfo.email })) {
                    email = orderinfo.email
                }
                let id = (new Date).toISOString().replace(/[^\d]/g, '').concat(String(Math.floor(Math.random() * 899) + 100))
                let u = new Order({
                    orderid: id,
                    email: email,
                    orderinfo: orderinfo,
                    items: items,
                    totalprice: subtotal,
                })
                let p = await u.save();
                console.log("order", id, p)
                return res.status(200).json({ success: true, msg: "Order Placed Successfully" })

            } catch (error) {
                return res.status(401).send({ success: false, msg: "Please authenticate using valid token" })
            }
        }

    }
    else {
        return res.status(400).json({ success: false, msg: "this method is not allowed" })

        // Handle any other HTTP method
    }
}

export default connectDb(handler)

