import { Request, Response } from "express";
import * as userService from "../services/users.service";

export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const newUser = await userService.createUser(user);
    res.status(201).send(newUser);
  } catch (error) {
    console.log("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
};
