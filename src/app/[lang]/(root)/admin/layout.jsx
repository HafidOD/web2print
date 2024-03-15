import NavbarAdmin from "@/components/NavbarAdmin";
import { getDictionary } from "@/utils/dictionary";

export default async function AdminLayout({ children, params }) {
  const lang = await getDictionary(params.lang);
  // console.log(params.lang);
  return (
    <>
      <NavbarAdmin lang={lang} langparam={params.lang} />
      <main className="p-3 md:p-8">{children}</main>
    </>
  );
}
