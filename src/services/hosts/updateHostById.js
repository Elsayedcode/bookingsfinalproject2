// service/Hosts/updateHostById.js
import { PrismaClient } from '@prisma/client';
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();

const updateHostById = async (id, data) => {
  try {
    const ontbrekendeVelden = []

    if (!id) {
      ontbrekendeVelden.push('id');
    }
  
  if (!data) {
    ontbrekendeVelden.push('data');
  }
  
  
    if (ontbrekendeVelden.length > 0) {
      throw new BadRequestError("one field is missing");
  }
  const host = await prisma.host.update({
    where: { id },
    data,
  });
  return host;
}catch (error) {
  // Handle or throw the error as appropriate for your application
  console.error('Error creating user:', error);
  throw error;
};
};

export default updateHostById;
