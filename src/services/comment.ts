"use server";

import { db } from "@/lib/mongoDb";
import { ObjectId } from "mongodb";

export type ResponseService = {
  status: number;
  message: string;
  data?: any;
};

// GET untuk mendapatkan daftar pengguna
export const getCommentList = async (): Promise<ResponseService> => {
  try {
    let commentList: any[] = [];
    await db(async (error, db) => {
      if (error) throw error;
      const commentDB = db.collection("comment");
      commentList = await commentDB
        .find({})
        .map((comment: any) => ({
          ...comment,
          _id: comment._id.toString(),
          created_date: new Date({ ...comment.created_date }.high * 1000).toString(),
        }))
        .toArray();
    });

    return {
      status: 200,
      message: "Get List comment Success",
      data: commentList,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// POST untuk membuat pengguna baru
export const createComment = async (commentData: any): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const commentDB = db.collection("comment");
      await commentDB.insertOne(commentData);
    });

    return {
      status: 201,
      message: "comment Created Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// PUT untuk memperbarui pengguna berdasarkan ID
export const updateComment = async (
  commentId: string,
  updatedcommentData: any
): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const commentDB = db.collection("comment");
      await commentDB.updateOne(
        { _id: new ObjectId(commentId) },
        { $set: updatedcommentData }
      );
    });

    return {
      status: 200,
      message: "comment Updated Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// DELETE untuk menghapus pengguna berdasarkan ID
export const deleteComment = async (commentId: string): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const commentDB = db.collection("comment");
      await commentDB.deleteOne({ _id: new ObjectId(commentId) });
    });

    return {
      status: 200,
      message: "comment Deleted Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
