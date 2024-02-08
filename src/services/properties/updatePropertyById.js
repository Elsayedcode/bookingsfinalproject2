// Service/properties/updatePropertyById.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updatePropertyById = async (id, data) => {
  const property = await prisma.property.update({
    where: { id },
    data,
  });
  return property;
};

export default updatePropertyById;
