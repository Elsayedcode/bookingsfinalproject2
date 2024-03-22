import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();
const saltRounds = 10;

const updateUserById = async (id, userData) => {

  try {
    const ontbrekendeVelden = []

    if (!id) {
      ontbrekendeVelden.push('id');
    }
  
  if (!userData) {
    ontbrekendeVelden.push('userData');
  }
  
  
    if (ontbrekendeVelden.length > 0) {
      throw new BadRequestError("one field is missing");
  }

  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, saltRounds);
  }
  
  const updatedUser = await prisma.user.update({
    where: { id },
    data: userData,
  });

  return updatedUser;
} catch (error) {
  // Handle or throw the error as appropriate for your application
  console.error('Error creating user:', error);
  throw error;
};
};
export default updateUserById;
