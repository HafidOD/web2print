import Card from "@/components/Card";
import { getDictionary } from "@/utils/dictionary";

export default async function AdminPage({ params }) {
  const lang = await getDictionary(params.lang);
  // console.log(lang);
  const list = [
    {
      name: `${lang.navbar.admin.properties}`,
      href: "admin/properties",
    },
    {
      name: `${lang.navbar.brands}`,
      href: "admin/enterprises",
    },
    {
      name: `${lang.navbar.admin.addresses}`,
      href: "admin/addresses",
    },
    {
      name: `${lang.navbar.admin.users}`,
      href: "admin/users",
    },
    {
      name: `${lang.navbar.admin.divisions}`,
      href: "admin/categories",
    },
    {
      name: `${lang.navbar.admin.items}`,
      href: "admin/products",
    },
  ];
  return (
    <div className="w-full px-2 py-8 m-auto md:w-4/5 sm:px-0">
      <div className="grid gap-3 lg:grid-cols-5 justify-items-center">
        {list.map((item) => (
          <Card key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
