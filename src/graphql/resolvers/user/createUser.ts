import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

type CreateUserInput = {
  username: string;
  email: string;
  password: string;
};

export const createUser = async (
  _: any,
  args: { data: CreateUserInput },
  { prisma }: { prisma: PrismaClient }
): Promise<User> => {
  const hashedPassword = await hashPassword(args.data.password);

  const user = await prisma.user.create({
    data: {
      username: args.data.username,
      email: args.data.email,
      password: hashedPassword,
    },
  });

  return user;
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
