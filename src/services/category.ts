"use server";

import { db } from "@/lib/mongoDb";
import { ObjectId } from "mongodb";

export type ResponseService = {
  status: number;
  message: string;
  data?: any;
};

// GET untuk mendapatkan daftar pengguna
export const getCategoryList = async (): Promise<ResponseService> => {
  try {
    let categoryList: any[] = [];
    await db(async (error, db) => {
      if (error) throw error;
      const categoryDB = db.collection("category");
      categoryList = await categoryDB
        .find({})
        .map((category: any) => ({
          ...category,
          _id: category._id.toString(),
          created_date: new Date({ ...category.created_date }.high * 1000),
          update_date: new Date({ ...category.update_date }.high * 1000),
        }))
        .toArray();
    });

    return {
      status: 200,
      message: "Get List category Success",
      data: categoryList,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// POST untuk membuat pengguna baru
export const createCategory = async (categoryData: any): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const categoryDB = db.collection("category");
      await categoryDB.insertOne(categoryData);
    });

    return {
      status: 201,
      message: "category Created Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// PUT untuk memperbarui pengguna berdasarkan ID
export const updateCategory = async (
  categoryId: string,
  updatedcategoryData: any
): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const categoryDB = db.collection("category");
      await categoryDB.updateOne(
        { _id: new ObjectId(categoryId) },
        { $set: updatedcategoryData }
      );
    });

    return {
      status: 200,
      message: "category Updated Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// DELETE untuk menghapus pengguna berdasarkan ID
export const deleteCategory = async (categoryId: string): Promise<ResponseService> => {
  try {
    await db(async (error, db) => {
      if (error) throw error;
      const categoryDB = db.collection("category");
      await categoryDB.deleteOne({ _id: new ObjectId(categoryId) });
    });

    return {
      status: 200,
      message: "category Deleted Successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
