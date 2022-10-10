
import connectDb from "../../middleware/mongoose"
const jwt = require('jsonwebtoken');

const handler = (async (req, res) => {

    if (req.method === 'POST') {

        const token = req.body.token;

        if (!token) {
            return res.status(401).send({ success: false, msg: "Please authenticate using valid token1" })

        }
        else {
            try {

                const data = await jwt.verify(token, process.env.JWT_SECRET);
                let user = data.user.email;
                return res.status(200).json({ success: true, msg: "Successfully Verify Token", User: data.user })
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

