import User from "../../models/user"
import connectDb from "../../middleware/mongoose"
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


const handler = async (req, res) => {

    if (req.method === 'POST') {


        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ success: false, msg: "sorry! this email is not registered" })
        }
        //adding salt to the password to secure and generating hash of password
        const secpass = await CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);;

        if (secpass === req.body.password) {
            const data = {
                user: {
                    id: user.id,
                    email: user.email
                }
            }
            const authtoken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });

            return res.status(200).json({ success: true, msg: "Login Successfully", authtoken })

        } else {
            return res.status(400).json({ success: false, msg: "password in correct" })

        }


    } else {
        return res.status(400).json({ success: false, msg: "this method is not allowed" })

        // Handle any other HTTP method
    }

}

export default connectDb(handler)

