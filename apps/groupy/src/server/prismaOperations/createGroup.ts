import type { Prisma, PrismaClient } from "@groupy/db_prisma";
import { TRPCError } from "@trpc/server";
import type { PrismaTransactionalClient } from "~/common/types";



type CreateGroup = {
  prisma:
    | PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
      >
    | PrismaTransactionalClient

  groupMakerId: string;
  groupName: string | undefined;
  groupImage?: string | null;
  minAgeLimit: number;
  maxAgeLimit: number;
  size: number;
  instantJoin: boolean;
};

const createGroup = async ({
  prisma,
  groupMakerId,
  groupName,
  groupImage = null,
  minAgeLimit,
  maxAgeLimit,
  size,
  instantJoin,
}: CreateGroup) => {
  if (!groupName) {
    throw new TRPCError({
      message: "Group name must be provided",
      code: "BAD_REQUEST",
    });
  }

  const group = await prisma.group.create({
    data: {
      name: groupName,
      image: groupImage,
      minAgeLimit,
      maxAgeLimit,
      size,
      instantJoin,
      users: {
        create: {
          userId: groupMakerId,
        },
      },
      moderators: {
        connect: {
          id: groupMakerId,
        },
      },
    },
  });

  return group;
};

export default createGroup;
