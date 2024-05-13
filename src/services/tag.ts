"use server";

import { db } from "@/lib/mongoDb";
import { ObjectId } from "mongodb";

export type ResponseService = {
  status: number;
  message: string;
  data?: any;
};

// GET untuk mendapatkan daftar pengguna
export const getTagList = async (): Promise<ResponseService> => {
  try {
    let tagList: any[] = [];
    await db(async (error, db) => {
      if (error) throw error;
      const tagDB = db.collection("tag");
      tagList = await tagDB
        .find({})
        .map((tag: any) => ({
          ...tag,
          _id: tag._id.toString(),
        }))
        .toArray();
    });

    return {
      status: 200,
      message: "Get List tag Success",
      data: tagList,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// POST untuk membuat pengguna baru
export const createTag = async (tagData: any): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const tagDB = db.collection("tag");
      await tagDB.insertOne(tagData);
    });

    return {
      status: 201,
      message: "tag Created Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// PUT untuk memperbarui pengguna berdasarkan ID
export const updateTag = async (
  tagId: string,
  updatedtagData: any
): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const tagDB = db.collection("tag");
      await tagDB.updateOne(
        { _id: new ObjectId(tagId) },
        { $set: updatedtagData }
      );
    });

    return {
      status: 200,
      message: "tag Updated Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// DELETE untuk menghapus pengguna berdasarkan ID
export const deleteTag = async (tagId: string): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const tagDB = db.collection("tag");
      await tagDB.deleteOne({ _id: new ObjectId(tagId) });
    });

    return {
      status: 200,
      message: "tag Deleted Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
