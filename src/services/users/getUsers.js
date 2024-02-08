import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUsers = async (username, email) => {
    let filterOptions = {};
    if (username) {
      filterOptions.username = username;
    }
    if (email) {
      filterOptions.email = email;
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
