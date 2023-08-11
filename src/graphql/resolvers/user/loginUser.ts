import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const loginUser = async (
  _: any,
  args: { data: LoginUserInput },
  { prisma }: { prisma: PrismaClient }
): Promise<{ user: User; token: string }> => {
  const user = await prisma.user.findUnique({
    where: { email: args.data.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const validPassword = await bcrypt.compare(args.data.password, user.password);

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = generateAuthToken(user.username, user.email);

  return { user, token };
};

interface LoginUserInput {
  email: string;
  password: string;
}

const generateAuthToken = (username: string, email: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  const authToken = jwt.sign(
    { username, email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // Token expiration (adjust as needed)
  );

  return authToken;
};
