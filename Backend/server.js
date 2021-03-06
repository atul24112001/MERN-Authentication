import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./Routes/userRoutes.js";
import { errorHandler, notFound } from "./Middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());


app.get("/", (req, res) => {
    res.send("Connected!")
})

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`)))
    .catch((error) => console.log(error));


