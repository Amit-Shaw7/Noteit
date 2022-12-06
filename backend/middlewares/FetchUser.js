const jwt = require('jsonwebtoken');
const JWT_TOKEN = "$%#!@AmItKuMShAw@6@68@6866@686697@!#%$";
// Getting user 
const fetchUser = async (req, res, next) => {
    // Getting token from request header
    const token = await req.header("auth-token");
    if (!token) {
        res.status(401).json({
            msg: "Unauthorised Access"
        })
    } else {
        try {
            const data = jwt.verify(token, JWT_TOKEN);
            // console.log("data : " , data);
            req.user = data.user;
        } catch (error) {
            res.status(401).json({
                msg : "Unauthorised Access"
            })
        }
    }
    next();
}

module.exports = fetchUser;