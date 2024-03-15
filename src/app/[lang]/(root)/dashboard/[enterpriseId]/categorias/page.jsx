import Categories from "@/components/Categories";

const URL = process.env.NEXT_PUBLIC_API_URL;
export async function fetchCategories(id) {
  const res = await fetch(`${URL}/${id}/categories`, { cache: 'no-store' });
  const data = await res.json();
  // console.log(data);
  return data.categories;
}
export default async function EnterpriseCategoriesPage({ params }) {
  // console.log(params.enterpriseId);
  const categories = await fetchCategories(params.enterpriseId);
  console.log(categories);
  return (
    <div className="w-3/5 px-2 py-16 m-auto sm:px-0">
      <Categories categories={categories}></Categories>
    </div>
  );
}
