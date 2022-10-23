import Product from "../../../models/product";
import connectDb from "../../../middleware/mongoose"


const handler = async (req, res) => {
    const name = req.body.name
    console.log(name,req.body)
    let products = await Product.find({ name: name })

    return res.status(200).json({ success: true, products })

}

export default connectDb(handler)

