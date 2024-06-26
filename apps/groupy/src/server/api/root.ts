import { createTRPCRouter } from "~/server/api/trpc";
import { accountRouter } from "./routers/account";
import { postRouter } from "./routers/posts";
import { tags } from "./routers/tags";
import { groupRouter } from "./routers/group";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  tags: tags,
  post: postRouter,
  group: groupRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
