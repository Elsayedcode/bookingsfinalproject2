// service/Review/updateReviewById.js
import { PrismaClient } from '@prisma/client';
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();

const updateReviewById = async (id, data) => {
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
  const review = await prisma.review.update({
    where: { id },
    data,
  });
  return review;
} catch (error) {
  // Handle or throw the error as appropriate for your application
  console.error('Error creating user:', error);
  throw error;
};
};

export default updateReviewById;
