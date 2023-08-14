import jwt from "jsonwebtoken";

// user
import createUser from "../repositories/users/createUser.js";
import loginUser from "../repositories/users/loginUser.js";

//session
import createSession from "../repositories/sessions/createSession.js";
import findSession from "../repositories/sessions/findSession.js";
import { generateAccessToken, generateRefreshToken } from "../services/generateJWT.js";
import endSession from "../repositories/sessions/endSession.js";

export const signUp = async (req, res) => {
    const userData = req.body;
    try {
        const user = await createUser(userData);
        if (user.created) {
            return res.sendStatus(201);
        } else {
            return res.status(409).send(user.message);
        }

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

export const signIn = async (req, res) => {
    const userData = req.body;
    try {
        const user = await loginUser(userData);
        if (user.credentialsMatch) {
            const { username, userId } = user;

            const accessToken = generateAccessToken(userId, username);
            const refreshToken = generateRefreshToken(userId, username);

            createSession({
                userId: user.userId, refreshToken
            });

            //Refresh cookie:
            const config = { httpOnly: true, sameSite: 'None', secure: true, maxAge: 10 * 60 * 60 * 1000 };
            res.cookie('jwt', refreshToken, config);

            return res.status(200).send({ accessToken, username, userId });
        } else {
            return res.status(401).send(user.message);
        }

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export const refreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    try {
        const session = await findSession(refreshToken);

        if (session.found) {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if (err || decoded.userId !== session.userId) return res.sendStatus(403);

                    const newAccessToken = jwt.sign(
                        { "userId": session.userId, "username": decoded.username },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '10s' }
                    );
                    // console.log("New token generated");
                    return res.send({ newAccessToken, userId: session.userId, username: decoded.username });
                }
            )
        } else {
            return res.sendStatus(403);
        }
    } catch (err) {
        return res.sendStatus(403);
    }
};

export const logoutUser = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    try {
        const session = await findSession(refreshToken);

        if (!session.found) {
            return res.sendStatus(204);
        }

        await endSession(refreshToken);
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
