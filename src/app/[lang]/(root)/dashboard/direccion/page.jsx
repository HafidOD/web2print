import Link from "next/link";
import AddressCard from "@/components/AddressCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { getDictionary } from "@/utils/dictionary";

const URL = process.env.NEXT_PUBLIC_API_URL;

// export async function fetchAddresses(enterpriseId) {
//   const res = await fetch(`${URL}/${enterpriseId}/addresses/`);
//   const data = await res.json();

//   return data.addresses;
// }
export async function fetchSingleAddresses(enterpriseId, userId) {
  const res = await fetch(`${URL}/addresses/user/${userId}`);
  const data = await res.json();

  return data.addresses;
}

export default async function AddressPage({ params }) {
  const lang = await getDictionary(params.lang);

  // const custom = {
  //   id: 0,
  //   officeName: `${lang.addresses["another-address"]}`,
  //   address: `${lang.addresses["advisors-shipping-address"]}`,
  //   price: 0,
  // };
  const { user } = await getServerSession(authOptions);

  const addresses = await fetchSingleAddresses(params.enterpriseId, user.id);
  // console.log(addresses);
  // console.log(user.property);
  // if (user.property != "Vontobel") {
  //   addresses.push(custom);
  // }

  // console.log(user);
  // if (user.role === 1) {
  // } else {
  //   addresses = await fetchAddresses(params.enterpriseId);
  // }

  // console.log(addresses);
  return (
    <div className="w-full px-2 py-5 m-auto space-y-5 md:w-2/5 sm:px-0">
      <div>
        <h3 className="text-xl font-bold text-center text-primaryBlue">
          {lang.addresses["select-shipping-address"]}
        </h3>
      </div>
      <div className="mt-5 bg-white rounded-lg shadow-lg">
        {addresses.length === 0 && (
          <p className="py-6 font-bold text-center text-primaryBlue">
            No hay direcciones disponibles
          </p>
        )}

        <ul role="list" className="px-3 divide-y divide-gray-100">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address}></AddressCard>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <Link
          href={`/${params.lang}/dashboard/checkout`}
          className="w-full text-white bg-primaryBlue rounded-lg text-md px-5 py-2.5 text-center font-bold"
        >
          {lang.products["proceed-checkout"]}
        </Link>
      </div>
    </div>
  );
}
