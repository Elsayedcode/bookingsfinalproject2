// service/Review/getReviews.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getReviews = async () => {
  const reviews = await prisma.review.findMany();
  return reviews;
};

export default getReviews;
