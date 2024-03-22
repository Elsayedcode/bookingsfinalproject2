// 
import { PrismaClient } from '@prisma/client';
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();

const createReview = async (userId, propertyId, rating, comment) => {

  try {
    const ontbrekendeVelden = []
    if (!userId) {
         ontbrekendeVelden.push('userId');
  }
  if (!propertyId) {
    ontbrekendeVelden.push('propertyId');
}
if (!rating) {
  ontbrekendeVelden.push('rating');
}
if (!comment) {
  ontbrekendeVelden.push('comment');
}

  if (ontbrekendeVelden.length > 0) {
    throw new BadRequestError("one field is messing");
}
  const review = await prisma.review.create({
    data: {
      userId: userId, 
      propertyId: propertyId, 
      rating: rating,
      comment: comment
    }
  });
  return review;
} catch(error) {
  console.error('Error creating property:', error);    
  throw error; // or handle error as appropriate
};
};

export default createReview;
