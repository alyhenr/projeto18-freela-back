import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/index.routes.js";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors({
    credentials: true, origin: ['https://projeto18-freela-front-4rtt-mmc9agtfj-alyhenr.vercel.app', 'https://projeto18-freela-front-bice-three.vercel.app', 'http://localhost:5173']
}))
app.use(express.json());

app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Server on, port: ${port}`); });