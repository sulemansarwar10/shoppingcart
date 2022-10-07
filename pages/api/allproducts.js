import Product from "../../models/product";
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {

    let products = await Product.find({})

    return res.status(200).json({ success: true, products })

}

export default connectDb(handler)

