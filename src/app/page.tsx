"use client";

import React, { useState, useEffect } from "react";
import { getCommentList } from "@/services/comment";
import { getCategoryList } from "@/services/category";
import { getPostTagList } from "@/services/post_tag";
import { getUserRoleList } from "@/services/user_role";
import { getPostList } from "@/services/post";
import Image from "next/image";
import Post from "@/components/fragments/post";
import { Skeleton } from "@/components/ui/skeleton";

interface UserRole {
  role: string;
  _id: string;
  name: string;
  description: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  created_date: string;
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
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [postTagList, setPostTagList] = useState<PostTag[]>([]);
  const [userRoleList, setUserRoleList] = useState<UserRole[]>([]);
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentListResponse = await getCommentList();
        const categoryListResponse = await getCategoryList();
        const postTagListResponse = await getPostTagList();
        const userRoleListResponse = await getUserRoleList();
        const postListResponse = await getPostList();

        setCommentList(commentListResponse?.data || []);
        setCategoryList(categoryListResponse?.data || []);
        setPostTagList(postTagListResponse?.data || []);
        setUserRoleList(userRoleListResponse?.data || []);
        setPostList(postListResponse?.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const profile = userRoleList.find(
    (userRole) => userRole.description === "Admin"
  );

  return (
    <main className="min-h-screen grid grid-cols-12">
      <div className="w-[82px] h-screen col-span-1 pt-12 pb-12 border-r flex-col flex items-center justify-between fixed">
        <Image src="/svg/Logo.svg" alt="Logo image" width={40} height={100} />
        <div className="space-y-8">
          <Image
            src="/svg/Home.svg"
            alt="Home image"
            width={28}
            height={100}
            className="cursor-pointer"
          />
          <Image
            src="/svg/Bookmark.svg"
            alt="Bookmark image"
            width={20}
            height={100}
            className="mx-auto cursor-pointer"
          />
          <hr className="border-[1.1px]" />
          <Image
            src="/svg/Write.svg"
            alt="Write image"
            width={25}
            height={100}
            className="cursor-pointer"
          />
        </div>
        <Image
          src="/svg/Profile.svg"
          alt="Profile image"
          width={40}
          height={100}
          className="cursor-pointer"
        />
      </div>
      <div className="col-span-9 pt-11 ml-20 flex justify-center">
        <div className="w-[80%] pr-12">
          <div className="flex items-center gap-2">
            <Image src="/svg/Add.svg" alt="Add" width={32} height={100} />
            <p className="font-light">Keep up with the latest in any topic</p>
          </div>
          <div className="flex gap-8 border-b pb-3 mt-7">
            <p className="font-light hover:font-normal cursor-pointer">
              Following
            </p>
            <p className="cursor-pointer">Recommended</p>
          </div>
          <Post />
        </div>
      </div>
      <div className="col-span-3 w-full border-l border-r pt-11 px-8">
        {loading ? null : (
          <p className="font-medium text-xl">Welcome, {profile?.name}</p>
        )}
        <div className="relative mt-10">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Image
              src="/svg/Search.svg"
              alt="Search image"
              width={20}
              height={100}
            />
          </div>
          <input
            type="search"
            className="w-full border border-gray-200 rounded-full px-10 py-2"
            placeholder="Search"
            required
          />
        </div>
        <div className="flex items-center gap-2 my-6">
          <p className="w-2 h-2 bg-green-800 rounded-full"></p>
          <p>What We’re Reading Today</p>
        </div>

        <div>
          {loading ? (
            <div className="my-5">
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </div>
          ) : (
            <div className="my-5 space-y-5 cursor-pointer">
              {postList.map((post, index) => (
                <div key={index}>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/svg/Profile.svg"
                      alt="Profile image"
                      width={25}
                      height={100}
                      className="cursor-pointer"
                    />
                    <p className="font-light">{profile?.name}</p>
                  </div>
                  <p className="mt-3">{post.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="font-light text-[#1A8917] text-[14px] cursor-pointer">
          See the full list
        </p>

        <div className="mt-10">
          <p>Recommended Topic</p>
          {loading ? (
            <div className="flex flex-wrap gap-2 pr-2 w-[250px] mt-5">
              <Skeleton className="h-8 w-[75px] rounded-full" />
              <Skeleton className="h-8 w-[60px] rounded-full" />
              <Skeleton className="h-8 w-[60px] rounded-full" />
              <Skeleton className="h-8 w-[70px] rounded-full" />
              <Skeleton className="h-8 w-[65px] rounded-full" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 pr-2 w-[250px] mt-5">
              {categoryList.map((category, index) => (
                <div key={index}>
                  <p className="w-fit text-[14px] bg-[#F2F2F2] rounded-full px-3 py-1.5 text-center cursor-pointer">
                    {category.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const PostSkeleton = () => {
  return (
    <div className="my-5 space-y-2">
      <div className="flex items-center gap-2 relative">
        <Skeleton className="h-[25px] w-[25px] rounded-full" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <Skeleton className="h-5 w-[265px]" />
      <Skeleton className="h-5 w-[100px]" />
    </div>
  );
};
