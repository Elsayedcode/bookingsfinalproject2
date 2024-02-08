import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const saltRounds = 10;

const updateUserById = async (id, userData) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, saltRounds);
  }
  
  const updatedUser = await prisma.user.update({
    where: { id },
    data: userData,
  });

  return updatedUser;
};

export default updateUserById;
