import * as jwtUtils from "../utils/jwt.utils";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) return res.status(400).send("No token provided");

    const decodedToken = jwtUtils.decodeAccessToken(token);
    if (!decodedToken) return res.status(401).send("Invalid token");

    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("Error authenticating: ", error);
    res.status(500).send("Error authenticating");
  }
};
export const authMiddlewareADMIN = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(400).send("No token provided");

    const decodedToken = jwtUtils.decodeAccessToken(token);
    if (!decodedToken) return res.status(401).send("Invalid token");

    req.user = decodedToken;
    // Vérif du rôle de l'utilisateur
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .send("You are not authorized to perform this action");
    }

    next();
  } catch (error) {
    console.error("Error authenticating:", error);
    res.status(500).send("Error authenticating");
  }
};
