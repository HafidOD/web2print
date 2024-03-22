import { redirect } from "next/navigation";

export default function page() {
  redirect(`/en/dashboard`);
  return <div>page</div>;
}
