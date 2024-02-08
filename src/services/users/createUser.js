
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const saltRounds = 10;

// Assuming createUser takes password as an argument now
async function createUser(username, name, email, phoneNumber, profilePicture, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

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
}

export default createUser;