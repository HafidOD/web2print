import Categories from "@/components/Categories";

// const URL = process.env.NEXT_PUBLIC_API_URL;
// export async function fetchCategories() {
//   const res = await fetch(`${URL}/categories`);
//   const data = await res.json();
//   // console.log(data.enterprises);
//   return data.categories;
// }
export default async function CategoriesPage() {
  // const categories = await fetchCategories();
  // console.log(categories);
  return (
    <div className="w-3/5 px-2 m-auto py-16 sm:px-0">
      <p>Hola mundo</p>
      {/* <Categories categories={categories}></Categories> */}
    </div>
  );
}
