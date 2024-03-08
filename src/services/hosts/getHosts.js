// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// const getHosts = async (username ,password,name ,email,phoneNumber,profilePicture,aboutMe) => {
//   return await prisma.host.findMany({username ,password,name ,email,phoneNumber,profilePicture,aboutMe
//     {where: {name: {contains: username,},},include: {listings: true,},}
//   });
// };

// export default getHosts; 

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getHosts = async (username) => {
  return await prisma.host.findMany({
    where: {
      username: {
        contains: username,
      },
    },
    include: {
      listings: true,
    },
  });
};

export default getHosts;
