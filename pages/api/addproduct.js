import Product from "../../models/product";
import connectDb from "../../middleware/mongoose"
import product from "../../models/product";
const jwt = require('jsonwebtoken');

const handler = (async (req, res) => {

    if (req.method === 'POST') {
        const token = req.body.token;

        let prod = await product.findOne({ name: req.body.name })
        const data = await jwt.verify(token, process.env.JWT_SECRET);
        if (prod) {
            return res.status(400).json({ success: false, msg: "sorry! this Product is already registered" })
        }
        else if (!token || !data.user.isAdmin) {
            return res.status(401).send({ success: false, msg: "Please authenticate using valid token1" })

        }
        else {
            try {

                let user = data.user.email;
                let p = new Product({
                    name: req.body.name,
                    img: req.body.img,
                    category: req.body.category,
                    price: req.body.price,
                    disc: req.body.disc,
                    user: user

                })
                await p.save();

                return res.status(200).json({ success: true, msg: "Product Add Successfully" })



            } catch (error) {
                return res.status(401).send({ success: false, msg: "Please authenticate using valid token" })
            }
        }

    } else {
        return res.status(400).json({ success: false, msg: "this method is not allowed" })

        // Handle any other HTTP method
    }

}
)
export default connectDb(handler)

