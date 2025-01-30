const {JWT_SECRET} = require("./config");
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("auth"+authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1].trim(); // Extract the token
    console.log(token)
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        console.log("dex"+decoded)
        req.userId = decoded.userId; // Attach the decoded userId to the request
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: err });
    }
}

module.exports = { authMiddleware };
