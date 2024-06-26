// Sebagai Contoh untuk mengambil data user menggunakan API dari MongoDB

import { getUserList } from "@/services/user";

export async function GET(request: Request) {
  try {
    return Response.json(
      {
        status: 200,
        message: "Success Upload",
        data: await getUserList()
          .then((res) => res?.data)
          .catch(() => []),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return Response.json(
      {
        status: 500,
        message: `Internal Server Error : ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export { getUserList };
