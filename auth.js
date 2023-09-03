import mongo from "mongodb"
import connect from "./db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config";

(async () => {
    const db = await connect();

    await db.collection("users").createIndex({
        email: 1
    }, {
        unique: true
    })
})()


export default {
    async registerUser(userData) {
        const db = await connect()

        const doc = {
            email: userData.email,
            password: await bcrypt.hash(userData.password, 8)
        }
        try {
            await db.collection("users").insertOne(doc)
        } catch (e) {
            throw new Error(e)
        }
    },

    async authenticateUser(email, password) {
        const db = await connect()
        const user = await db.collection("users").findOne({
            email: email
        })

        if (user && user.password && (await bcrypt.compare(password, user.password))) {

            const token = jwt.sign(user, String(process.env.JWT_SECRET), {
                algorithm: "HS512",
                expiresIn: "1 day"
            })
            return {
                token,
                email: user.email
            }

        } else {
            throw new Error("Can't authenticate")
        }
    },
    async verify(req, res, next) {
        try {
            if (req.headers.authorization) {

                const auth = req.headers.authorization.split(" ")
                const type = auth[0]
                const token = auth[1]

                if (type !== "Bearer") {
                    return res.status(401).send()
                } else {
                    req.jwt = jwt.verify(token, String(process.env.JWT_SECRET));
                    return next();
                }

            } else {
                return res.status(401).send()
            }
        } catch (e) {
            return res.status(403).send(e.message);
        }
    }
}