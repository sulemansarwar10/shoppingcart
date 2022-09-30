// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Feedback from "../../models/feedback"
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {

    if (req.method === 'POST') {


        let u = new Feedback({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            message: req.body.message,

        })
        await u.save();
        return res.status(200).json({ success: true, msg: "Your Response successfully submited" })

    } else {
        return res.status(400).json({ error: "this method is not allowed" })

        // Handle any other HTTP method
    }


}

export default connectDb(handler)

