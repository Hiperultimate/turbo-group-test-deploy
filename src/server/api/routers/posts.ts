
import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Session } from "next-auth";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

/**
 * 
 * @param prismaClient
 * @param session 
 * @returns [{post} * 10] array of 10 latest posts 
 */
export async function getPosts(prisma : PrismaClient, session : Session){
  if(!session){
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid user session",
    })
  }
  return prisma.post.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
    }
  });
}

export const postRouter = createTRPCRouter({
  getPosts: protectedProcedure.query(({ ctx }) => {
    return getPosts(ctx.prisma, ctx.session)
  }),
});
