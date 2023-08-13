import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send("No token provided");

    // Bearer token (Access token)
    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token (or expired)
            req.userId = decoded.userId;
            next();
        }
    );
};