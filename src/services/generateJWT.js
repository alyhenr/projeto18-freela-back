import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, username) => {
    const accessToken = jwt.sign(
        { "userId": userId, "username": username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10s' }
    );

    return accessToken;
};

export const generateRefreshToken = (userId, username) => {
    const refreshToken = jwt.sign(
        { "userId": userId, "username": username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "10h" }
    );

    return refreshToken;
};