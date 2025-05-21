import prisma from "./src/prismaClient.js";

beforeEach(async () => {
  await prisma.song.deleteMany();
  await prisma.playlist.deleteMany();
  jest.clearAllMocks();
});

afterAll(async () => {
  await prisma.$disconnect();
});
