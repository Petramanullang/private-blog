import { getUserList } from "@/services/users";

export default async function Home() {
  const userList: any[] = await getUserList()
    .then((res) => res?.data)
    .catch(() => []);

  return (
    <main className="min-h-screen grid place-content-center">
      <h1 className="mb-6">List User</h1>
      {userList.map((item, index) => (
        <div key={index}>
          <p>id : {item._id}</p>
          <p>username : {item.user_name}</p>
          <p>fullname : {item.fullname}</p>
        </div>
      ))}
    </main>
  );
}
