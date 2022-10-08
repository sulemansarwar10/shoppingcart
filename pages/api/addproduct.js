import Product from "../../models/product";
import connectDb from "../../middleware/mongoose"
const jwt = require('jsonwebtoken');

const handler = (async (req, res) => {

    if (req.method === 'POST') {
        console.log("req", req.body)


        const token = req.body.token;

        if (!token) {
            return res.status(401).send({ success: false, msg: "Please authenticate using valid token1" })

        }
        else {
            try {

                const data = await jwt.verify(token, process.env.JWT_SECRET);
                console.log("d", data.user.email)
                let user = data.user.email;
                console.log("u", user)
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

