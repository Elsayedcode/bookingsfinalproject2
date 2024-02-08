// 
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createReview = async (userId, propertyId, rating, comment) => {
  const review = await prisma.review.create({
    data: {
      userId: userId, 
      propertyId: propertyId, 
      rating: rating,
      comment: comment
    }
  });
  return review;
};

export default createReview;
