"use server";

import { db } from "@/lib/mongoDb";

export type ResponseService = {
  status: number;
  message: string;
  data?: any;
};

export const getUserList = async (): Promise<ResponseService> => {
  try {
    let userList: any[] = [];
    await db(async (error, db) => {
      if (error) throw error;
      const usersDB = db.collection("user");
      userList = await usersDB
        .find({})
        .map((users: any) => ({ ...users, _id: users._id.toString(), created_date: new Date({ ...users.created_date }.high * 1000), update_date: new Date({ ...users.update_date }.high * 1000) }))
        .toArray();
    });

    return {
      status: 200,
      message: "Get List User Success",
      data: userList,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
