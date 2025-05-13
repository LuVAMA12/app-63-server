import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET
 const verifyUser = async (req, res, next) => {

    //We remove 'Bearer' to get only the token in the authorization
     const token = req.headers.authorization?.split(' ') [1]
     if (!token) {
        return res.status(401).json('Access refused: no token provided')
     }
    try {

        // We verify the token's validity
        const decoded = await jwt.verify(token, JWT_SECRET)
        if(!decoded) {
            return res.status(403).json(`Access denied, wrong token`)
        }

        // We transfer the information in the decoded token to future middleware 
        req.user = decoded

        next()
    } catch (error) {
        
        // We send differents messages according to type of error using the jwt's native functions
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ error: "Invalid token : incorrect signature" });
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ error: "Token expired, please login again" });
        }
        return res.status(500).json({ error: "Error while verifating the token" });
    }
 }

 export default verifyUser