"use server";

import { db } from "@/lib/mongoDb";
import { ObjectId } from "mongodb";

export type ResponseService = {
  status: number;
  message: string;
  data?: any;
};

// GET untuk mendapatkan daftar pengguna
export const getPostTagList = async (): Promise<ResponseService> => {
  try {
    let postTagList: any[] = [];
    await db(async (error, db) => {
      if (error) throw error;
      const postTagsDB = db.collection("post_tag");
      postTagList = await postTagsDB
        .find({})
        .map((postTags: any) => ({
          ...postTags,
          _id: postTags._id.toString(),
        }))
        .toArray();
    });

    return {
      status: 200,
      message: "Get List PostTag Success",
      data: postTagList,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// POST untuk membuat pengguna baru
export const createPostTag = async (postTagData: any): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const postTagsDB = db.collection("post_tag");
      await postTagsDB.insertOne(postTagData);
    });

    return {
      status: 201,
      message: "PostTag Created Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// PUT untuk memperbarui pengguna berdasarkan ID
export const updatePostTag = async (
  postTagId: string,
  updatedpostTagData: any
): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const postTagsDB = db.collection("post_tag");
      await postTagsDB.updateOne(
        { _id: new ObjectId(postTagId) },
        { $set: updatedpostTagData }
      );
    });

    return {
      status: 200,
      message: "postTag Updated Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// DELETE untuk menghapus pengguna berdasarkan ID
export const deletePostTag = async (postTagId: string): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const postTagsDB = db.collection("post_tag");
      await postTagsDB.deleteOne({ _id: new ObjectId(postTagId) });
    });

    return {
      status: 200,
      message: "PostTag Deleted Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
