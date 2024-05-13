"use server";

import { db } from "@/lib/mongoDb";
import { ObjectId } from "mongodb";

export type ResponseService = {
  status: number;
  message: string;
  data?: any;
};

// GET untuk mendapatkan daftar pengguna
export const getUserList = async (): Promise<ResponseService> => {
  try {
    let userList: any[] = [];
    await db(async (error, db) => {
      if (error) throw error;
      const usersDB = db.collection("user");
      userList = await usersDB
        .find({})
        .map((users: any) => ({
          ...users,
          is_active: users.is_active.toString(),
          _id: users._id.toString(),
          created_date: new Date({ ...users.created_date }.high * 1000),
          update_date: new Date({ ...users.update_date }.high * 1000),
        }))
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

// POST untuk membuat pengguna baru
export const createUser = async (userData: any): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const usersDB = db.collection("user");
      await usersDB.insertOne(userData);
    });

    return {
      status: 201,
      message: "User Created Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// PUT untuk memperbarui pengguna berdasarkan ID
export const updateUser = async (
  userId: string,
  updatedUserData: any
): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const usersDB = db.collection("user");
      await usersDB.updateOne(
        { _id: new ObjectId(userId) },
        { $set: updatedUserData }
      );
    });

    return {
      status: 200,
      message: "User Updated Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// DELETE untuk menghapus pengguna berdasarkan ID
export const deleteUser = async (userId: string): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const usersDB = db.collection("user");
      await usersDB.deleteOne({ _id: new ObjectId(userId) });
    });

    return {
      status: 200,
      message: "User Deleted Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
