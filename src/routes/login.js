

import { Router } from "express";
import login from "../services/auth/login.js";
import logMiddleware from "../middleware/logMiddleware.js"
import auth from "../middleware/auth.js"

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);

    if (!token) {
      res.status(401).json({ error: 'Password is incorrect' });
    } else {
      res.status(200).json({ message: "Successfully logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

export default router;

// router.post("/", async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const result = await login(username, password);

//     if (result.error) {
//       // Respond with 401 Unauthorized when there's an error (user not found or incorrect password)
//       return res.status(401).json({ message: result.error });
//     } else {
//       // On successful authentication, return the token
//       return res.status(200).json({ message: "Successfully logged in!", token: result.token });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// export default router;