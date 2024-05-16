"use server";

import { db } from "@/lib/mongoDb";
import { ObjectId } from "mongodb";

export type ResponseService = {
  status: number;
  message: string;
  data?: any;
};

// GET untuk mendapatkan daftar pengguna
export const getPostList = async (): Promise<ResponseService> => {
  try {
    let postList: any[] = [];
    await db(async (error, db) => {
      if (error) throw error;
      const postDB = db.collection("post");
      postList = await postDB
        .find({})
        .map((post: any) => ({
          ...post,
          _id: post._id.toString(),
          created_date: new Date(
            { ...post.created_date }.high * 1000
          ).toString(),
          update_date: new Date({ ...post.update_date }.high * 1000).toString(),
        }))
        .toArray();
    });

    return {
      status: 200,
      message: "Get List post Success",
      data: postList,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// Fungsi untuk mendapatkan post berdasarkan ID
export const getPostById = async (id: string): Promise<ResponseService> => {
  try {
    let postById: any = null;
    await db(async (error, db) => {
      if (error) throw error;
      const postDB = db.collection("post");
      postById = await postDB.findOne({ _id: new ObjectId(id) });
    });

    if (!postById) {
      return {
        status: 404,
        message: "Post not found",
      };
    }

    return {
      status: 200,
      message: "Get post success",
      data: postById,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// POST untuk membuat pengguna baru
export const createPost = async (postData: any): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const postDB = db.collection("post");
      await postDB.insertOne(postData);
    });

    return {
      status: 201,
      message: "post Created Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// PUT untuk memperbarui pengguna berdasarkan ID
export const updatePost = async (
  postId: string,
  updatedpostData: any
): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const postDB = db.collection("post");
      await postDB.updateOne(
        { _id: new ObjectId(postId) },
        { $set: updatedpostData }
      );
    });

    return {
      status: 200,
      message: "post Updated Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// DELETE untuk menghapus pengguna berdasarkan ID
export const deletePost = async (postId: string): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const postDB = db.collection("post");
      await postDB.deleteOne({ _id: new ObjectId(postId) });
    });

    return {
      status: 200,
      message: "post Deleted Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
