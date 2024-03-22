// Service/properties/deletePropertyById.js
import { PrismaClient } from '@prisma/client';
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();

const deletePropertyById = async (id) => {
  try {
    const ontbrekendeVelden = []
  
    if (!id) {
      ontbrekendeVelden.push('id');
    }
  
    if (ontbrekendeVelden.length > 0) {
      throw new BadRequestError("one field is missing");
  }
  const property = await prisma.property.delete({
    where: { id },
  });
  return property;
} catch (error) {
  console.error("Error deleting user:", error);
  throw error;
}
};

export default deletePropertyById;
