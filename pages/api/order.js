import Product from "../../models/product";
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {

    if (req.method === 'POST') {
        let cart = req.body
        let keys = Object.keys(cart)
        console.log(cart, keys)
        let products = await Product.find({ name: keys })


        console.log("p", products)

        try {
            return res.status(200).json({ success: true, msg: "Order Placed Successfully" })

        } catch (error) {
            return res.status(401).send({ success: false, msg: "Please authenticate using valid token" })
        }

    }
    else {
        return res.status(400).json({ success: false, msg: "this method is not allowed" })

        // Handle any other HTTP method
    }
}

export default connectDb(handler)

