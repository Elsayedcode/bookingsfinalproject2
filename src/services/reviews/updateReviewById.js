// service/Review/updateReviewById.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updateReviewById = async (id, data) => {
  const review = await prisma.review.update({
    where: { id },
    data,
  });
  return review;
};

export default updateReviewById;
