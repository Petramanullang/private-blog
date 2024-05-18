// src/app/posts/[id]/page.tsx

import { getPostById } from "@/services/post";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
  created_date: string;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const response = await getPostById(params.id);

  if (response.status !== 200) {
    return (
      <div>
        <h1>{response.message}</h1>
      </div>
    );
  }

  const post: Post = response.data;

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
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href={"/"}>
            <Image
              src="/svg/Logo.svg"
              alt="Logo image"
              width={40}
              height={100}
              className="cursor-pointer"
            />
          </Link>
          <div className="flex">
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 mr-8">
              <div className="flex items-center gap-2">
                <Image
                  src="/svg/Write.svg"
                  alt="Logo image"
                  width={25}
                  height={100}
                  className="cursor-pointer"
                />
                <p className="text-[14px]">Write</p>
              </div>
              <Image
                src="/svg/Notification.svg"
                alt="Logo image"
                width={25}
                height={100}
                className="ml-8 cursor-pointer"
              />
            </div>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    width={25}
                    height={100}
                    className="w-8 h-8 rounded-full"
                    src="/svg/Profile.svg"
                    alt="user photo"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Setting</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col justify-center items-center mx-[350px]">
        {!post ? (
          <div>Loading...</div>
        ) : (
          <div className="mt-16">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="flex items-center relative gap-2 mt-8 my-14">
              <Image
                src="/svg/Profile.svg"
                alt="Profile image"
                width={40}
                height={100}
              />
              <div>
                <p className="font-medium">PetraJM</p>
                <p className="font-light">{timeAgo(post.created_date)}</p>
              </div>
              <Image
                src="/svg/AddBookmark.svg"
                alt="AddBookmark image"
                width={30}
                height={100}
                className="absolute right-0 cursor-pointer"
              />
            </div>
            <div>
              <Image
                src="/img/article-1.png"
                alt="Article-1 image"
                width={200}
                height={350}
                className="my-2 w-full h-[350px] object-cover"
              />
              <p className="text-center">Article 1</p>
            </div>
            <p className="mt-8">{post.content}</p>
            <p className="mt-8">{post.content}</p>
            <p className="mt-8">{post.content}</p>
            <p className="mt-8">{post.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
