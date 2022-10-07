import Product from "../../models/product";
import connectDb from "../../middleware/mongoose"
import fetchuser from "../../middleware/fetchuser";


const handler = (fetchuser, async (req, res) => {

    if (req.method === 'POST') {

        let p = new Product({
            name: req.body.name,
            img: req.body.img,
            category: req.body.category,
            price: req.body.price,
            disc: req.body.disc,

        })
        await p.save();

        return res.status(200).json({ success: true, msg: "Product Add Successfully" })
    } else {
        return res.status(400).json({ success: false, msg: "this method is not allowed" })

        // Handle any other HTTP method
    }

}
)
export default connectDb(handler)

