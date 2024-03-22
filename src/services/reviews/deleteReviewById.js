// service/Review/deleteReviewById.js
import { PrismaClient } from '@prisma/client';
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();

const deleteReviewById = async (id) => {
  try {
    const ontbrekendeVelden = []

    if (!id) {
      ontbrekendeVelden.push('id');
    }
  
    if (ontbrekendeVelden.length > 0) {
      throw new BadRequestError("one field is missing");
  }
  const review = await prisma.review.delete({
    where: { id },
  });
  return review;
} catch (error) {
  console.error("Error deleting review:", error);
  throw error;
};
};

export default deleteReviewById;
