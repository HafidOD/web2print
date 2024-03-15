import ButtonsActionAdmin from "@/components/ButtonsActionAdmin";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getDictionary } from "@/utils/dictionary";
export const dynamic = "force-dynamic";

export async function fetchUsersAdmin() {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${URL}/users/`);
  if (res.ok) {
    const data = await res.json();
    // console.log(data);

    return data.users;
  }
  return [];
}
export default async function AdminUsersPage({ params }) {
  const lang = await getDictionary(params.lang);
  const users = await fetchUsersAdmin();

  // console.log(users);
  return (
    <div className="w-full px-2 pt-8 m-auto md:w-3/5 sm:px-0">
      <section className="flex justify-between">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-center text-primaryBlue">
            {lang.admin.users}
          </h3>
        </div>
        <div>
          <Link
            href={`/${params.lang}/admin/users/nuevo`}
            className="flex text-white bg-primaryBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {lang.admin.new}
            <PlusSmallIcon className="block w-5 h-5 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <div className="p-4 mt-5 bg-white rounded-lg shadow-lg">
        {users.length === 0 && <p className="mb-2">Aun no hay usuarios</p>}
        <ul role="list" className="divide-y divide-gray-100">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between py-2 gap-x-6"
            >
              <div className="flex items-center gap-x-4">
                <div className="flex-auto min-w-0">
                  <p className="text-xs font-semibold leading-tight text-primaryBlue md:text-sm">
                    {user.userName}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    {user.email}, {user.telefono} {user.role}, {user.typePrice}
                  </p>
                </div>
              </div>
              <div className="justify-center sm:flex sm:flex-col sm:items-end ">
                <ButtonsActionAdmin
                  id={user.id}
                  itemURL={"users"}
                  paramslang={params.lang}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
