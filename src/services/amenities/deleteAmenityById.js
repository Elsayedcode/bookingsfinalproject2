// service/Amenity/deleteAmenityById.js
import { PrismaClient } from '@prisma/client';
import BadRequestError from "../../error/BadRequestError.js";


const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();
  try {
    const ontbrekendeVelden = []

    if (!id) {
      ontbrekendeVelden.push('id');
    }
  
    if (ontbrekendeVelden.length > 0) {
      throw new BadRequestError("one field is missing");
  }
  const amenity = await prisma.amenity.deleteMany({
    where: { id },
  });
  return amenity.count > 0 ? id : null;

} catch (error) {
  console.error("Error deleting amenity:", error);
  throw error;
};
};

export default deleteAmenityById;
