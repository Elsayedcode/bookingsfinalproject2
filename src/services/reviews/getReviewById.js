// service/Review/getReviewById.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getReviewById = async (id) => {
  const review = await prisma.review.findUnique({
    where: { id },
  });
  return review;
};

export default getReviewById;
