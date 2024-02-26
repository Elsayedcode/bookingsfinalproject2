
import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
//import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middleware/auth.js";


const router = Router();

router.get('/', async (req, res) => {
  try {
    console.log("wat is er aan de hand")
      const { username, id } = req.query;
      const users = await getUsers(username, id);

      res.json(users);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});

// router.post("/login", auth, async (req, res, next) => {
//   try {
//     // Including password in the destructure from req.body
//     const { username, name, email, phoneNumber, profilePicture, password } = req.body;
//     // Passing password to createUser
//     const newUser = await createUser(username, name, email, phoneNumber, profilePicture, password);
//     res.status(201).json(newUser);
//   } catch (error) {
//     next(error);
//   }
// });


router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    if (deletedUser) {
      res.status(200).send({
        message: `User with id ${id} successfully deleted`,
        deletedUser,
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, name,email,phoneNumber,profilePicture } = req.body;
    const updatedUser = await updateUserById(id, { username, name,email,phoneNumber,profilePicture});

    if (updatedUser) {
      res.status(200).send({
        message: `User with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;