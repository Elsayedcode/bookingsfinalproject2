
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";


// import { PrismaClient } from "@prisma/client";

// const login = async (username, submittedPassword) => {
//   const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
//   const prisma = new PrismaClient();

//   // Find the user by username
//   const user = await prisma.user.findUnique({
//     where: { username },
//   });

//   if (!user) {
//     return null; // User not found
//   }

//   // Compare submitted password with the hashed password stored in the database
//   const isPasswordValid = await bcrypt.compare(submittedPassword, user.password);

//   if (!isPasswordValid) {
//     return null; // Password is incorrect
//   }

//   // Generate JWT token if the password is correct
//   const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '2h' }); // Token expires in 2 hours

//   return token;
// };

// export default login;

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const login = async (username, submittedPassword) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const prisma = new PrismaClient();

  try {
    // Find the user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      // Instead of returning null, throw an error to indicate user not found
      throw new Error("User not found");
    }

    // Compare submitted password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(submittedPassword, user.password);

    if (!isPasswordValid) {
      // Instead of returning null, throw an error to indicate incorrect password
      throw new Error('Password is incorrect');
    }

    // Generate JWT token if the password is correct
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '2h' });
    return { token }; // Return an object with the token
  } catch (error) {
    // Handle the thrown errors
    return { error: error.message };
  }
};

export default login;
