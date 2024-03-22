
import { PrismaClient } from '@prisma/client';
import BadRequestError from "../../error/BadRequestError.js";

import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const saltRounds = 10;

// Assuming createUser takes password as an argument now
async function createUser(username, name, email, phoneNumber, profilePicture, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const ontbrekendeVelden = []
    if (!username) {
         ontbrekendeVelden.push('username');
  }
  if (!name) {
    ontbrekendeVelden.push('name');
}
if (!email) {
  ontbrekendeVelden.push('email');
}
if (!phoneNumber) {
  ontbrekendeVelden.push('phoneNumber');
}
if (!profilePicture) {
  ontbrekendeVelden.push('profilePicture');
}

if (!password) {
  ontbrekendeVelden.push('password');
}

  if (ontbrekendeVelden.length > 0) {
    throw new BadRequestError("one field is missing");
}
  const newUser = await prisma.user.create({
    data: {
      username,
      name,
      email,
      phoneNumber,
      profilePicture,
      password: hashedPassword, // Store the hashed password
    },
  });

  // Exclude password from the returned object
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
} catch (error) {
  // Handle or throw the error as appropriate for your application
  console.error('Error creating user:', error);
  throw error;
}
};

export default createUser;