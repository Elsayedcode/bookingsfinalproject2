// service/Review/deleteReviewById.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const deleteReviewById = async (id) => {
  const review = await prisma.review.delete({
    where: { id },
  });
  return review;
};

export default deleteReviewById;
