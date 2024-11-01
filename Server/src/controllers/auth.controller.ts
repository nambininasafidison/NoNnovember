import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/user.model";
import { handleCustomError } from "../utils/handleCustomError";

dotenv.config();

type SignupFormType = {
  username: string;
  email: string;
  password: string;
};

type SigninFormType = {
  email: string;
  password: string;
};

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password }: SignupFormType = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(handleCustomError(900, "Email is already taken"));
  }
};

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: SigninFormType = req.body;

  try {
    const validUser = await User.findOne({ where: { email } });
    if (!validUser) {
      return res.json({
        success: false,
        message: "User not found",
        statusCode: 404,
      });
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.json({
        success: false,
        message: "Invalid password",
        statusCode: 401,
      });
    }

    const privateKey: Secret = process.env.JWT_SECRET || "";
    const token = jwt.sign({ id: validUser.id }, privateKey, {
      expiresIn: "1d",
    });

    const { password: hashedPassword, ...rest } = validUser.toJSON(); // Exclude password

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
