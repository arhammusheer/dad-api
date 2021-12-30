import { Request, Response, NextFunction } from "express";
import { readFileSync } from "fs";
import { resolve } from "path";
import { verify } from "jsonwebtoken";
import ApikeyModel from "../models/Apikey.model";
import {v4 as uuidv4} from 'uuid';

const PUBLIC_KEY = readFileSync(resolve(__dirname, "../../keys/public.key"));

interface JWTPayload {
    user: {
        email: string;
        id: string;
    };
    _2fa: boolean;
}

export default class ApikeyController {
    public async create(req: Request, res: Response, next: NextFunction) {
        let token = req.cookies.token || req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        token = token.replace("Bearer ", "");
        console.log(token);
        console.log(uuidv4());
        try {
            const decoded : any = verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
            const apikey = await ApikeyModel.create({
                user_id: decoded.user.id,
                key: uuidv4(),
            });
            res.json(apikey);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: err,
                message: "Token is invalid",
            });
        }
        next();
    }
//   public async random(req: Request, res: Response, next: NextFunction) {
}

