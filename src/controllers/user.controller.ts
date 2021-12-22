import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User.model";
import { compare, genSalt, hash } from "bcrypt";
import * as EmailValidator from "email-validator";
import { sign, verify } from "jsonwebtoken";
import { readFileSync } from "fs";
import { resolve } from "path";

interface UserRegistration {
  email: string;
  password: string;
  totp_verified?: boolean;
}

const PRIVATE_KEY = readFileSync(resolve(__dirname, "../../keys/private.key"));
const PUBLIC_KEY = readFileSync(resolve(__dirname, "../../keys/public.key"));

export default class UserController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as UserRegistration;
      if (!user.email || !user.password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const userExists = await UserModel.findOne({
        where: {
          email: user.email,
        },
      });

      if (!userExists) {
        return res.status(400).json({
          message: "User does not exist",
        });
      }

      const isPasswordValid = await compare(
        user.password,
        userExists.password_hash
      );

      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      // TODO: TOTP for 2FA

      // JWT
      const payload = {
        user: {
          id: userExists._id,
          email: userExists.email,
        },
        _2fa: false,
      };
      const token = sign(payload, PRIVATE_KEY, { algorithm: "RS256" });

      res.cookie("token", token, {
        signed: true,
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      });

      return res.status(200).json({
        message: "User logged in successfully",
        user: payload.user,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as UserRegistration;

      if (!user.email || !user.password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }


      EmailValidator.validate(user.email)
        ? null
        : res.status(400).json({
            message: "Please enter a valid email",
          });
      const userExists = await UserModel.findOne({
        
          email: user.email,
        
      });
      
      if (userExists) {
        return res.status(409).json({
          message: "User already exists",
        });
      }

      const salt = await genSalt(10);
      const hashedPassword = await hash(user.password, salt);

      const newUser = await UserModel.create({
        email: user.email,
        password_hash: hashedPassword,
      });

      // JWT
      const payload = {
        id: newUser._id,
        email: newUser.email,
      };
      const token = sign(payload, PRIVATE_KEY, { algorithm: "RS256" });

      res.cookie("token", token, {
        // signed: true,
        // secure: true,
        httpOnly: true,
        // sameSite: "strict",
      });

      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          email: newUser.email,
          created_at: newUser.created_at,
          updated_at: newUser.updated_at,
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async totp_register(req: Request, res: Response, next: NextFunction) {
    // TODO: Implement TOTP
    try {
      const token_valid = await verify(req.signedCookies.token, PUBLIC_KEY);
      console.log(req.signedCookies);
      if (!token_valid) {
        return res.status(400).json({
          message: "Invalid token",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("token");
      return res.status(200).json({
        message: "User logged out successfully",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
