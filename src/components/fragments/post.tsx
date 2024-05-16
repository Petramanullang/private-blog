"use client";

import React, { useState, useEffect } from "react";
import { getPostList } from "@/services/post";
import { getUserRoleList } from "@/services/user_role";
import { getTagList } from "@/services/tag";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  content: string;
  created_date: string;
}

interface UserRole {
  role: string;
  _id: string;
  name: string;
  description: string;
}

interface Tag {
  _id: string;
  name: string;
}

export default function Post() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [userRoleList, setUserRoleList] = useState<UserRole[]>([]);
  const [tagList, setTagList] = useState<Tag[]>([]);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postListResponse = await getPostList();
        const userRoleListResponse = await getUserRoleList();
        const tagListResponse = await getTagList();

        setUserRoleList(userRoleListResponse?.data || []);
        setPostList(postListResponse?.data || []);
        setTagList(tagListResponse?.data || []);
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

  const handlePostClick = (id: string) => {
    router.push(`/posts/${id}`);
  };

  function timeAgo(time: any) {
    const currentTime = new Date();
    const targetTime = new Date(time);

    if (!(currentTime instanceof Date) || !(targetTime instanceof Date)) {
      return "Invalid date";
    }

    const difference = Math.abs(currentTime.getTime() - targetTime.getTime());
    const seconds = Math.floor(difference / 1000);
    const days = Math.floor(seconds / (3600 * 24));

    if (days > 0) {
      return days + (days === 1 ? " day ago" : " days ago");
    } else {
      return "today";
    }
  }

  return (
    <div>
      {loading ? (
        <div>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      ) : (
        <div>
          {postList.map((post, index) => (
            <div
              key={index}
              onClick={() => handlePostClick(post._id)}
              className="mt-10 border-b cursor-pointer">
              <div className="flex gap-2">
                <Image
                  src="/svg/Profile.svg"
                  alt="Profile image"
                  width={25}
                  height={100}
                />
                <p className="font-light">
                  {profile?.name} · {timeAgo(post.created_date)}
                </p>
              </div>
              <div className="relative">
                <p className="text-[22px] font-medium my-2">{post.title}</p>
                <p className="font-light text-justify my-2 max-w-[75%]">
                  {post.content}
                </p>
                <Image
                  src="/img/article-1.png"
                  alt="Article-1 image"
                  width={160}
                  height={100}
                  className="absolute right-0 -top-5 translate-x-10"
                />
              </div>
              <div className="flex justify-between w-[75%] my-8">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-light bg-[#F2F2F2] px-2 py-1 rounded-full">
                    {tagList.map((tag) => tag.name)}
                  </span>
                  <p className="font-light">· Selected For You</p>
                </div>
                <Image
                  src="/svg/AddBookmark.svg"
                  alt="AddBookmark image"
                  width={25}
                  height={100}
                  className=""
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="border-b mt-10">
      <div className="flex items-center gap-2 relative">
        <Skeleton className="h-[25px] w-[25px] rounded-full" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-[160px] w-[160px] my-2 absolute right-0 -top-2 translate-x-10" />
      </div>
      <div>
        <Skeleton className="h-5 w-[55%] my-4" />
        <Skeleton className="h-4 w-[75%] my-2" />
        <Skeleton className="h-4 w-[75%] my-2" />
        <Skeleton className="h-4 w-[75%] my-2" />
        <Skeleton className="h-4 w-[25%] my-2" />
        <div className="my-8 flex justify-between w-[75%]">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-28" />
          </div>
          <Skeleton className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
