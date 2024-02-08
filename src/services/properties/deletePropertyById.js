// Service/properties/deletePropertyById.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const deletePropertyById = async (id) => {
  const property = await prisma.property.delete({
    where: { id },
  });
  return property;
};

export default deletePropertyById;
