import { Request, Response, NextFunction } from "express";
import TransactionModel from "../models/Transaction.model";

export default async function TransactionHandler(req: Request, res: Response, next: NextFunction){
    //w   
    const transaction = new TransactionModel({
        
    });
    if(!res.statusCode) {
        
    }
    await transaction.save();
}