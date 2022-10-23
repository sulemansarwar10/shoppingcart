import Product from "../../../models/product";
import connectDb from "../../../middleware/mongoose"


const handler = async (req, res) => {
    const { slug } = req.query
    let products = await Product.find({ category: slug })

    return res.status(200).json({ success: true, products })

}

export default connectDb(handler)

