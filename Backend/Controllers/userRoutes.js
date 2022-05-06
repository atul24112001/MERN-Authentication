
import { GenerateToken } from "../config/generateToken.js";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
    const { name, email, password, picture } = req.body;

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
        res.json({
            status: "error",
            statusCode: 400,
            message: "Please Enter valid Inouts!"
        })
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.json({
            status: "error",
            statusCode: 400,
            message: "User Already Exist!"
        })
    }

    if (password.split("").length < 8) {
        res.json({
            status: "error",
            statusCode: 406,
            message: "Password's Length Should be More Than 7."
        })
    }

    const valid = (password.split("").length > 7) && !(name.trim() === "" || email.trim() === "" || password.trim() === "") && !userExists

    const user = valid ? await User.create({ name, email, password, picture }) : valid;

    if (user) {
        let data = {
            _id: user._id,
            name: user.name,
            picture: user.picture,
            email: user.email,
            token: GenerateToken(user._id),
        }
        res.json({
            success: true, statusCode: 201, data: data
        })
    } else {
        res.status(400).json({
            status: 'error',
            message: "Something went wrong can't singup."
        })
    }
}

export const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        let data = {
            _id: user._id,
            name: user.name,
            picture: user.picture,
            email: user.email,
            token: GenerateToken(user._id)
        }
        res.json({
            status: "success", statusCode: 200, userDetails: data
        })
    } else {
        res.json({
            status: "error",
            statusCode: 400,
            message: "Invalid Email or Password!"
        })
    }
}
