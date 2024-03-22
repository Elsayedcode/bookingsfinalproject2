
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const login = async (username, submittedPassword) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const prisma = new PrismaClient();

  //try {
    // Find the user by username
    
    const user = await prisma.user.findUnique({
      where: { username },
    });

    
    if (!user) {
      throw new Error('User not found');
      return null;
    }

    const isPasswordValid = await bcrypt.compare(submittedPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Password is incorrect');
    }
    

    // Compare submitted password with the hashed password stored in the database
    

    // if (!isPasswordValid) {
    //   throw new Error('Password is incorrect');
    // }

    // Generate JWT token if the password is correct
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '2h' });
    return { token }; // Return an object with the token
  // } 
  // catch (error) {
  //   return null;
  //   //return (error.message);
  // }
};

export default login;
