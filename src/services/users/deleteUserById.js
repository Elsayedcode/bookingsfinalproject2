import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUserById = async (id) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser.id; // Assuming deletion was successful
  } catch (error) {
    console.error("Error deleting user:", error);
    return null; // Return null or handle the error as needed
  }
};

export default deleteUserById;
