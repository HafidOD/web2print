import Categories from "@/components/Categories";
export const dynamic = "force-dynamic";

const URL = process.env.NEXT_PUBLIC_API_URL;
export async function fetchCategories(id, parentId) {
  const res = await fetch(`${URL}/${id}/${parentId}/`);
  const data = await res.json();
  // console.log(data);
  return data.categories;
}
export default async function ParentCategoryPage({ params }) {
  // console.log(params.parentCategoryId);
  const categories = await fetchCategories(
    params.enterpriseId,
    params.categoryParentId
  );
  // console.log(params);
  return (
    <div className="w-3/5 px-2 py-16 m-auto sm:px-0">
      <Categories categories={categories} params={params}></Categories>
    </div>
  );
}
