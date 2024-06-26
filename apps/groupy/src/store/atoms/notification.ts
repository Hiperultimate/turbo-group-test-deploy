import type { Notification } from "@groupy/db_prisma";
import { atom } from "recoil";

export const notification = atom({
    key: 'notification',
    default: [] as Notification[],
})
