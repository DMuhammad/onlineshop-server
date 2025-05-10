const { PrismaClient } = require("../../src/generated/prisma");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      password: bcrypt.hashSync("B0$$kuBabi", bcrypt.genSaltSync()),
      fullName: "Admin",
      role: "ADMIN",
    },
  });

  console.log({ admin });
}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
