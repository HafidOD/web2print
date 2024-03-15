import Navbar from "@/components/Navbar";
import { getDictionary } from "@/utils/dictionary";

export default async function DashboardLayout({ children, params }) {
  const lang = await getDictionary(params.lang);
  return (
    <>
      <Navbar lang={lang} paramslang={params.lang}></Navbar>
      <main className="p-3 md:p-8">{children}</main>
    </>
  );
}
