// service/Amenity/createAmenity.js
import { PrismaClient } from '@prisma/client';
import BadRequestError from "../../error/BadRequestError.js";
const createAmenity = async ( name) => {
  const prisma = new PrismaClient();
  const newAmenity = {
    name,
  };

    const ontbrekendeVelden = []
    
  if (!name) {
    ontbrekendeVelden.push('name');
}
  if (ontbrekendeVelden.length > 0) {
    throw new BadRequestError("one field is messing");
}
  const amenity = await prisma.amenity.create({ 
    data: newAmenity
   });
  return amenity;

};

export default createAmenity;
