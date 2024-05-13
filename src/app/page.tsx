"use client";

import React, { useState, useEffect } from "react";
import { getUserList } from "@/services/user";
import { getUserRoleList } from "@/services/user_role";
import { getPostList } from "@/services/post";
import { getCommentList } from "@/services/comment";
import { getCategoryList } from "@/services/category";
import { getPostTagList } from "@/services/post_tag";
import { getTagList } from "@/services/tag";

interface User {
  _id: string;
  user_name: string;
  fullname: string;
  is_active: boolean;
}

interface UserRole {
  _id: string;
  name: string;
  description: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
}

interface Comment {
  _id: string;
  post_id: string;
  user_id: string;
  content: string;
}

interface Category {
  _id: string;
  title: string;
  description: string;
}

interface PostTag {
  _id: string;
  post_id: string;
  tag_id: string;
  primary: string;
}

interface Tag {
  _id: string;
  name: string;
}

export default function Home() {
  const [userList, setUserList] = useState<User[]>([]);
  const [userRoleList, setUserRoleList] = useState<UserRole[]>([]);
  const [postList, setPostList] = useState<Post[]>([]);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [postTagList, setPostTagList] = useState<PostTag[]>([]);
  const [tagList, setTagList] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userListResponse = await getUserList();
        const userRoleListResponse = await getUserRoleList();
        const postListResponse = await getPostList();
        const commentListResponse = await getCommentList();
        const categoryListResponse = await getCategoryList();
        const postTagListResponse = await getPostTagList();
        const tagListResponse = await getTagList();

        setUserList(userListResponse?.data || []);
        setUserRoleList(userRoleListResponse?.data || []);
        setPostList(postListResponse?.data || []);
        setCommentList(commentListResponse?.data || []);
        setCategoryList(categoryListResponse?.data || []);
        setPostTagList(postTagListResponse?.data || []);
        setTagList(tagListResponse?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen grid grid-cols-2 place-content-center justify-items-center">
      {userList.map((item, index) => (
        <div key={index} className="min-w-[300px]">
          <h1 className="text-3xl font-bold my-6">List User</h1>
          <p>id : {item._id}</p>
          <p>username : {item.user_name}</p>
          <p>fullname : {item.fullname}</p>
          <p>is_Active : {item.is_active}</p>
        </div>
      ))}
      {userRoleList.map((item, index) => (
        <div key={index} className="min-w-[300px]">
          <h1 className="text-3xl font-bold my-6">List User Role</h1>
          <p>id : {item._id}</p>
          <p>username : {item.name}</p>
          <p>role : {item.description}</p>
        </div>
      ))}
      {postList.map((item, index) => (
        <div key={index} className="min-w-[300px]">
          <h1 className="text-3xl font-bold my-6">List Post</h1>
          <p>id : {item._id}</p>
          <p>Title : {item.title}</p>
          <p>Content : {item.content}</p>
        </div>
      ))}
      {commentList.map((item, index) => (
        <div key={index} className="min-w-[300px]">
          <h1 className="text-3xl font-bold my-6">List Comment</h1>
          <p>id : {item._id}</p>
          <p>UserId : {item.user_id}</p>
          <p>Content : {item.content}</p>
        </div>
      ))}
      {categoryList.map((item, index) => (
        <div key={index} className="min-w-[300px]">
          <h1 className="text-3xl font-bold my-6">List Category</h1>
          <p>id : {item._id}</p>
          <p>Title : {item.title}</p>
          <p>Description : {item.description}</p>
        </div>
      ))}
      {postTagList.map((item, index) => (
        <div key={index} className="min-w-[300px]">
          <h1 className="text-3xl font-bold my-6">List Post Tag</h1>
          <p>id : {item._id}</p>
          <p>PostId : {item.post_id}</p>
          <p>TagId : {item.tag_id}</p>
        </div>
      ))}
      {tagList.map((item, index) => (
        <div key={index} className="min-w-[300px]">
          <h1 className="text-3xl font-bold my-6">List Tag</h1>
          <p>id : {item._id}</p>
          <p>Name : {item.name}</p>
        </div>
      ))}
    </main>
  );
}
