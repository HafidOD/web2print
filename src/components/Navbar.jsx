"use client";
import Image from "next/image";
import Link from "next/link";
import { Disclosure, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import IconCart from "./IconCart";

import useCart from "@/app/hooks/use-cart";
import { signOut } from "next-auth/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ lang, paramslang }) {
  // console.log(lang);
  const navigation = [
    { name: `${lang.navbar.brands}`, href: `/${paramslang}/dashboard` },
    {
      name: `${lang.navbar.dashboard.orders}`,
      href: `/${paramslang}/dashboard/pedidos`,
    },
  ];
  const removeAll = useCart((state) => state.removeAll);

  async function logout() {
    await removeAll();
    signOut({ redirect: false }).then(() => {
      window.location.href = "https://web2print.gruporegio.mx/en/";
    });
    // signOut({
    //   callbackUrl: "https://web2print.gruporegio.mx/",
    // });
  }

  return (
    <Disclosure as="nav" className="bg-primaryBlue">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-white rounded-md focus:outline-none">
                  <span className="sr-only">
                    <Menu></Menu>
                  </span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                <div className="relative block px-3 py-1 ml-3 bg-white rounded-full md:hidden text-primaryBlue">
                  {paramslang === "en" ? (
                    <a
                      href="/es/dashboard"
                      className="flex items-center font-bold"
                    >
                      es
                      <ChevronRightIcon
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <a
                      href="/en/dashboard"
                      className="flex items-center font-bold"
                    >
                      en
                      <ChevronRightIcon
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <Link href={`/${paramslang}/dashboard/`}>
                    <Image
                      className=""
                      src="/images/logos/logo_regio_white.png"
                      alt="Logo Grupo Regio"
                      width={125}
                      height={37}
                      priority
                    />
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-white text-black"
                            : "text-white hover:bg-white hover:text-black",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <IconCart paramslang={paramslang}></IconCart>
                {/* <div className="relative ml-3">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      ></img>
                </div> */}
                <div className="relative hidden px-3 py-1 ml-3 bg-white rounded-full md:block text-primaryBlue">
                  {paramslang === "en" ? (
                    <a
                      href="/es/dashboard"
                      className="flex items-center font-bold"
                    >
                      es
                      <ChevronRightIcon
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <a
                      href="/en/dashboard"
                      className="flex items-center font-bold"
                    >
                      en
                      <ChevronRightIcon
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>

                <div className="relative flex justify-center ml-3">
                  <button
                    onClick={logout}
                    type="button"
                    className="p-1 text-[#193761] bg-white rounded-full focus:outline-none"
                  >
                    <ArrowRightOnRectangleIcon
                      className="w-6 h-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-white text-black"
                      : "text-white hover:bg-white hover:text-black",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
