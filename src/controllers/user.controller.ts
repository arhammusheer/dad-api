import { Request, Response, NextFunction } from "express";

export default class UserController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      res.send("login");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
