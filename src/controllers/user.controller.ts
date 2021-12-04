import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User.model";
import { compare, genSalt, hash } from "bcrypt";
import * as EmailValidator from "email-validator";
import { sign, verify } from "jsonwebtoken";

interface UserRegistration {
  email: string;
  password: string;
}

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

      //TODO: Generate JWT token
      // TODO: TOTP for 2FA

      // JWT
      const payload = {
        id: userExists._id,
        email: userExists.email,
      };
      const token = sign(payload, );

      return res.status(200).json({
        message: "User logged in successfully",
        user: payload,
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
        where: {
          email: user.email,
        },
      });

      if (userExists) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const salt = await genSalt(10);
      const hashedPassword = await hash(user.password, salt);

      const newUser = await UserModel.create({
        email: user.email,
        password_hash: hashedPassword,
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
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
