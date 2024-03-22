// service/Amenity/updateAmenityById.js
import { PrismaClient } from '@prisma/client';
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();

const updateAmenityById = async (id, updatedAmenity) => {
  try {
    const ontbrekendeVelden = []

    if (!id) {
      ontbrekendeVelden.push('id');
    }
  
  if (!updatedAmenity) {
    ontbrekendeVelden.push('updatedAmenity');
  }

  
    if (ontbrekendeVelden.length > 0) {
      throw new BadRequestError("one field is missing");
  }
  const amenity = await prisma.amenity.updateMany({
    where: { id },
    data: updatedAmenity,
  });
  return amenity.count > 0 ? id : null;
} catch (error) {
  // Handle or throw the error as appropriate for your application
  console.error('Error creating user:', error);
  throw error;
};
};

export default updateAmenityById;
