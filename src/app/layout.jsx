// "use client"
import ToastProvider from "@/providers/toast-providers";
// import { Inter } from 'next/font/google'
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from "react";
// import { userContext } from '@/context/user';

import "./globals.css";
import { Providers } from "@/providers/providers";
export const metadata = {
  title: "Web 2 Print",
  description: "Simplifica y controla tu inventario",
};

export default function RootLayout({ children, params }) {
  // const [userData, setUserData] = useState({});
  // const router = useRouter();
  // useEffect(() => {
  //   const data = localStorage.getItem('apiauth');
  //     if (data == null) {
  //       router.replace('/')
  //       // Swal.fire('You need to login before')

  //     } else {
  //       const obj = JSON.parse(data);
  //       if (!["concierge", "admin", "admon", "sales", "operations", "manager"].includes(obj.user.role)) {
  //         router.replace('/')
  //       }

  //   }
  // }, [router])
  // useEffect(()=> {
  //   try {
  //     const data = localStorage.getItem('apiauth');
  //     if (data != null) {
  //       const obj = JSON.parse(data);
  //       setUserData(obj)
  //     }
  //   } catch (error) {
  //     console.log(err);
  //   }
  // },[])
  // console.log(params.lang);
  return (
    <html lang="es">
      <body className="min-h-screen ">
        <ToastProvider />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
