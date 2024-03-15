"use client";
import { Disclosure, Menu } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarAdmin({ lang, langparam }) {
  // console.log(lang);
  const navigation = [
    { name: `${lang.navbar.home}`, href: `/${langparam}/admin` },
    {
      name: `${lang.navbar.admin.properties}`,
      href: `/${langparam}/admin/properties`,
    },
    { name: `${lang.navbar.brands}`, href: `/${langparam}/admin/enterprises` },
    {
      name: `${lang.navbar.admin.addresses}`,
      href: `/${langparam}/admin/addresses`,
    },
    { name: `${lang.navbar.admin.users}`, href: `/${langparam}/admin/users` },
    {
      name: `${lang.navbar.admin.divisions}`,
      href: `/${langparam}/admin/categories`,
    },
    {
      name: `${lang.navbar.admin.items}`,
      href: `/${langparam}/admin/products`,
    },
    { name: "Dashboard", href: `/${langparam}/dashboard` },
  ];
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
                  {langparam === "en" ? (
                    <a href="/es/admin" className="flex items-center font-bold">
                      es
                      <ChevronRightIcon
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <a href="/en/admin" className="flex items-center font-bold">
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
                  <Link href={`/${langparam}/admin`}>
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
                <div className="relative hidden px-3 py-1 ml-3 bg-white rounded-full md:block text-primaryBlue">
                  {langparam === "en" ? (
                    <a href="/es/admin" className="flex items-center font-bold">
                      es
                      <ChevronRightIcon
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <a href="/en/admin" className="flex items-center font-bold">
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
                    onClick={() =>
                      signOut({ redirect: false }).then(() => {
                        window.location.href =
                          "https://web2print.gruporegio.mx/en/";
                      })
                    }
                    type="button"
                    className="p-1 bg-white rounded-full text-primaryBlue focus:outline-none"
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
