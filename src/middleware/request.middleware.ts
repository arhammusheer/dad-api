import { Request, Response, NextFunction } from "express";
import RequestModel from "../models/Request.model";

export default async function RequestHandler(req: Request, res: Response, next: NextFunction) {
    const ip = req.body.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`${ip} - ${req.method} ${req.originalUrl}`);

    const userAgent = req.headers['user-agent'];
    if(!res.statusCode){
        res.status(404).json({
            message: "Not found",
        });
    }
    const request = new RequestModel({
        user_id: req.body.user_id || "public",
        time: new Date(Date.now()),
        origin: {
            ip,
            user_agent: userAgent,
        },
        transaction_id: req.body.transaction_id || null,
        url: req.originalUrl,
        method: req.method,
        status: res.statusCode,
    });
    await request.save();
}