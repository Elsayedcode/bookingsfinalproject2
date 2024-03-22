import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUsers = async (username, id) => {
    let filterOptions = {};
    if (username) {
      filterOptions.username = username;
    }
    if (id) {
      filterOptions.email = id;
    }
  
    return await prisma.user.findMany({
      where: filterOptions,
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        // Exclude the password field if present
        password: false
      },
    });
  };
  

export default getUsers;
