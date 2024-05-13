"use server";

import { db } from "@/lib/mongoDb";
import { ObjectId } from "mongodb";

interface ResponseService {
  status: number;
  message: string;
  data?: any;
}

// GET untuk mendapatkan daftar role pengguna
export const getUserRoleList = async (): Promise<ResponseService> => {
  try {
    let userRoleList: any[] = [];
    await db(async (error, db) => {
      if (error) throw error;
      const userRoleDB = db.collection("user_role");
      userRoleList = await userRoleDB
        .find({})
        .map((userRole: any) => ({
          _id: userRole._id.toString(),
          ...userRole,
        }))
        .toArray();
    });

    return {
      status: 200,
      message: "Get List User Success",
      data: userRoleList,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// POST untuk membuat pengguna baru
export const createUserRole = async (userRoleData: any): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const userRoleDB = db.collection("user_role");
      await userRoleDB.insertOne(userRoleData);
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
export const updateUserRole = async (
  userRoleId: string,
  updatedUserRoleData: any
): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const userRoleDB = db.collection("user_role");
      await userRoleDB.updateOne(
        { _id: new ObjectId(userRoleId) },
        { $set: updatedUserRoleData }
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
export const deleteUser = async (userRoleId: string): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const userRoleDB = db.collection("user_role");
      await userRoleDB.deleteOne({ _id: new ObjectId(userRoleId) });
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
