

import { Router } from "express";
import login from "../services/auth/login.js";
import logMiddleware from "../middleware/logMiddleware.js"
import auth from "../middleware/auth.js"

 const router = Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("check login1")
    const result = await login(username, password);
    console.log("check login2")
    console.log(result)
    if (result.token) {
      res.status(200).json({ message: "Successfully logged in!", token: result.token });
    }
  } catch (error) {
    if (error.message === 'User not found' || error.message === 'Password is incorrect') {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router;



