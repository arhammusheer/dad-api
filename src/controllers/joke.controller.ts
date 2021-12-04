import { Request, Response, NextFunction } from "express";
import ContentModel from "../models/Content";

export default class ApiController {
  public index(req: Request, res: Response, next: NextFunction) {
    res.json({
      message: "Hello World!",
    });
  }

  public async random(req: Request, res: Response, next: NextFunction) {
    ContentModel.aggregate([{$match:{type:"joke"}}, { $sample: { size: 1 } }]);
    res.json({
      message: "Hello World!",
    });
  }
}
