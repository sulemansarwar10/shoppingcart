// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/user"
import connectDb from "../../middleware/mongoose"
const CryptoJS = require("crypto-js");


const handler = async (req, res) => {

  if (req.method === 'POST') {


    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ success: false, msg: "sorry! this email is already registered" })
    }
    //adding salt to the password to secure and generating hash of password
    const secpass = await CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY);



    let u = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      contact: req.body.contact,
      password: secpass,

    })
    await u.save();
    return res.status(200).json({ success: true, msg: "Account created successfully" })

  } else {
    return res.status(400).json({ error: "this method is not allowed" })

    // Handle any other HTTP method
  }


}

export default connectDb(handler)

