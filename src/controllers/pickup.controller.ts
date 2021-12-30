import { Request, Response, NextFunction } from "express";
import ContentModel from "../models/Content.model";

export default class PickupController {
  public async random(req: Request, res: Response, next: NextFunction) {
    // TODO: Implement pagination
    const count = parseInt(req.query.count as string) || 1;

    if (count > 10) {
      return res.status(400).json({
        message:
          "Count must be less than 10. You can always upgrade your plan.",
      });
    }

    const pickup = await ContentModel.aggregate([
      { $match: { type: "pickup" } },
      { $sample: { size: count } },
    ]);
    res.json({
      pickup,
    });
    next();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization !== process.env.API_KEY) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    try {
      const pickup = await ContentModel.create({
        type: "pickup",
        content: req.body.joke,
      });

      res.json(pickup);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "Duplicate key found",
      });
    }
    next();
  }
}
