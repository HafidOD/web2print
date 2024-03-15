import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import Enterpises from "@/components/Enterpises";
import { getDictionary } from "@/utils/dictionary";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUser(id) {
  const res = await fetch(`${URL}/users/${id}`, { cache: "no-cache" });
  const user = await res.json();
  // console.log(user);
  return user;
}

export default async function DashboardPage({ params }) {
  const session = await getServerSession(authOptions);

  // console.log(session.user);
  if (!session) return;
  const lang = await getDictionary(params.lang);
  // console.log(lang);
  const user = await fetchUser(session.user.id);
  // console.log(user.data.enterprises);
  // console.log(user);
  return (
    <div className="w-full px-2 py-16 m-auto md:w-3/5 sm:px-0">
      <section>
        <h3 className="text-3xl font-medium text-center text-primaryBlue">
          {lang.dashboard.welcome}
          <span className="font-bold"> {session.user.property} </span>
        </h3>
        <h3 className="mb-5 text-3xl font-bold text-center text-primaryBlue">
          {lang.dashboard["inventory-management"]}
        </h3>
      </section>
      <section className="mt-16 md:mt-20">
        <Enterpises
          enterprises={user.data.enterprises}
          paramslang={params.lang}
        ></Enterpises>
      </section>
    </div>
  );
}
