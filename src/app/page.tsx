"use client";

import React, { useState, useEffect } from "react";
import { getUserList } from "@/services/user";
import { getUserRoleList } from "@/services/user_role";
import { getPostList } from "@/services/post";
import { getCommentList } from "@/services/comment";
import { getCategoryList } from "@/services/category";
import { getPostTagList } from "@/services/post_tag";
import { getTagList } from "@/services/tag";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <div className="w-full h-screen p-8 bg-[#18191a] col-span-1 flex flex-col justify-between text-white">
        <span className="text-3xl">Logo</span>
        <p className="text-lg w-[95%]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
          itaque delectus voluptas alias sint autem cumque praesentium
          blanditiis qui!
        </p>
      </div>
      <div className="w-full h-screen bg-[#08090a] cols-span-1 flex flex-col justify-center px-36 space-y-3">
        <span className="text-white text-3xl text-center">
          Welcome, to Idk What is this
        </span>
        <p className="text-white text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        <Input className="text-white" type="email" placeholder="Email" />
        <Input className="text-white" type="text" placeholder="Password" />
        <Button className="bg-white text-[#08090a] hover:bg-black hover:text-white hover:border-white hover:border">
          Submit
        </Button>
      </div>
    </main>
  );
}
