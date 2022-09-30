// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/user"
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {

    if (req.method === 'POST') {


        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ success: false, msg: "sorry! this email is not registered" })
        }
        return res.status(200).json({ success: true, msg: "Reset Email sent successfully" })




    } else {
        return res.status(400).json({ error: "this method is not allowed" })

        // Handle any other HTTP method
    }


}

export default connectDb(handler)

