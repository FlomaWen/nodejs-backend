import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await authService.login(email, password);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// refresh token

// get session
