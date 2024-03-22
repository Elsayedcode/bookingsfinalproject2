// Service/properties/getPropertyById.js
import { PrismaClient } from '@prisma/client';
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();

const getPropertyById = async (id) => {

  try {
    const ontbrekendeVelden = []
    if (!id) {
         ontbrekendeVelden.push('data');
  }

  if (ontbrekendeVelden.length > 0) {
    throw new BadRequestError("one field is messing");
}
  const property = await prisma.property.findUnique({
    where: { id },
  });
  return property;
} catch(error) {
  console.error('Error creating property:', error);    
  throw error; // handle error as appropriate
};
};

export default getPropertyById;
