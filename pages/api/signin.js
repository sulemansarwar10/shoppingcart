import User from "../../models/user"
import connectDb from "../../middleware/mongoose"
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


const handler = async (req, res) => {

    if (req.method === 'POST') {

        try {
            let data
            try {
                data = JSON.parse(req.body)

            } catch (error) {
                data = req.body

            }
            const { email, password } = data
            let user = await User.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ success: false, msg: "sorry! this email is not registered" })
            }
            //adding salt to the password to secure and generating hash of password
            const secpass = await CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);;

            if (secpass === password) {
                const data = {
                    user: {
                        name: user.fname,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                }
                const authtoken = await jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });

                return res.status(200).json({ success: true, msg: "Login Successfully", authtoken })

            } else {
                return res.status(400).json({ success: false, msg: "password in correct" })

            }

        } catch (error) {
            return res.status(400).json({ success: false, msg: "some error in server", error })

        }

    } else {
        return res.status(400).json({ success: false, msg: "this method is not allowed" })

        // Handle any other HTTP method
    }

}

export default connectDb(handler)

