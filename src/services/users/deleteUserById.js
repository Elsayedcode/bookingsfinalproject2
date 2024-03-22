import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../error/BadRequestError.js";
const prisma = new PrismaClient();

const deleteUserById = async (id) => {
  try {
    const ontbrekendeVelden = []

    if (!id) {
      ontbrekendeVelden.push('id');
    }
  
    if (ontbrekendeVelden.length > 0) {
      throw new BadRequestError("one field is missing");
  }
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser.id; // Assuming deletion was successful
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export default deleteUserById;
