import { PrismaClient, User, Note, Category } from "@prisma/client";
import { createUser } from "./resolvers/user/createUser";
import { loginUser } from "./resolvers/user/loginUser";

interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

interface CreateNoteInput {
  title: string;
  content: string;
  ownerId: number;
  categoryId?: number;
}

interface CreateCategoryInput {
  name: string;
  color: string;
  ownerId: number;
}

interface UpdateUserInput {
  username?: string;
  email?: string;
  password?: string;
}

interface UpdateNoteInput {
  title?: string;
  content?: string;
  categoryId?: number;
}

interface UpdateCategoryInput {
  name?: string;
  color?: string;
}

export const resolvers = {
  Query: {
    getUser: (
      _: any,
      args: { id: number },
      context: any
    ): Promise<User | null> => {
      return context.prisma.user.findUnique({
        where: { id: args.id },
      });
    },
    getNote: (
      _: any,
      args: { id: number },
      { prisma }: { prisma: PrismaClient }
    ): Promise<Note | null> => {
      return prisma.note.findUnique({
        where: { id: args.id },
      });
    },
    getCategory: (
      _: any,
      args: { id: number },
      { prisma }: { prisma: PrismaClient }
    ): Promise<Category | null> => {
      return prisma.category.findUnique({
        where: { id: args.id },
      });
    },
    getUserByUsername: (
      _: any,
      args: { username: string },
      { prisma }: { prisma: PrismaClient }
    ): Promise<User | null> => {
      return prisma.user.findUnique({
        where: { username: args.username },
      });
    },
    getUserByEmail: (
      _: any,
      args: { email: string },
      { prisma }: { prisma: PrismaClient }
    ): Promise<User | null> => {
      return prisma.user.findUnique({
        where: { email: args.email },
      });
    },
    getAllNotes: (
      _: any,
      args: any,
      { prisma }: { prisma: PrismaClient }
    ): Promise<Note[]> => {
      return prisma.note.findMany();
    },
    getAllCategories: (
      _: any,
      args: any,
      { prisma }: { prisma: PrismaClient }
    ): Promise<Category[]> => {
      return prisma.category.findMany();
    },
  },
  Mutation: {
    createUser,
    loginUser,
    createNote: (
      _: any,
      args: { data: CreateNoteInput },
      { prisma }: { prisma: PrismaClient }
    ): Promise<Note> => {
      return prisma.note.create({
        data: {
          title: args.data.title,
          content: args.data.content,
          ownerId: args.data.ownerId,
          categoryId: args.data.categoryId,
        },
      });
    },
    createCategory: (
      _: any,
      args: { data: CreateCategoryInput },
      { prisma }: { prisma: PrismaClient }
    ): Promise<Category> => {
      return prisma.category.create({
        data: {
          name: args.data.name,
          color: args.data.color,
          ownerId: args.data.ownerId,
        },
      });
    },
    updateUser: (
      _: any,
      args: { id: number; data: UpdateUserInput },
      { prisma }: { prisma: PrismaClient }
    ): Promise<User> => {
      return prisma.user.update({
        where: { id: args.id },
        data: {
          username: args.data.username,
          email: args.data.email,
          password: args.data.password,
        },
      });
    },
    updateNote: (
      _: any,
      args: { id: number; data: UpdateNoteInput },
      { prisma }: { prisma: PrismaClient }
    ): Promise<Note> => {
      return prisma.note.update({
        where: { id: args.id },
        data: {
          title: args.data.title,
          content: args.data.content,
          categoryId: args.data.categoryId,
        },
      });
    },
    updateCategory: (
      _: any,
      args: { id: number; data: UpdateCategoryInput },
      { prisma }: { prisma: PrismaClient }
    ): Promise<Category> => {
      return prisma.category.update({
        where: { id: args.id },
        data: {
          name: args.data.name,
          color: args.data.color,
        },
      });
    },
    deleteUser: (
      _: any,
      args: { id: number },
      { prisma }: { prisma: PrismaClient }
    ): Promise<User> => {
      return prisma.user.delete({
        where: { id: args.id },
      });
    },
    deleteNote: (
      _: any,
      args: { id: number },
      { prisma }: { prisma: PrismaClient }
    ): Promise<Note> => {
      return prisma.note.delete({
        where: { id: args.id },
      });
    },
    deleteCategory: (
      _: any,
      args: { id: number },
      { prisma }: { prisma: PrismaClient }
    ): Promise<Category> => {
      return prisma.category.delete({
        where: { id: args.id },
      });
    },
  },
};
