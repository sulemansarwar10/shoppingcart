const jwt = require('jsonwebtoken');

const fetchuser = async (req, res, next) => {
    //get the user from jwt token and add it to req id
    const token = req.header("auth-token");
    console.log("t",token)
    if (!token) {
        return res.status(401).send({ success: false, msg: "Please authenticate using valid token" })

    }
    try {

        const data = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;

        next();
    } catch (error) {
        return res.status(401).send({ success: false, msg: "Please authenticate using valid token" })
    }

}

module.exports = fetchuser;