"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  HomeIcon,
  MapPinIcon,
  NewspaperIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import LOGO from "@/public/logo-landing-page.png";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import useStudent from "@/hooks/useStudent";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Class Timetable", href: "/schedule", icon: CalendarIcon },
];
const userNavigation = [
  { name: "Profile", href: "#" },
  { name: "Sign out", href: "/" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>("00:00:00 AM");

  // Check if MOD_AUTH_CAS cookie is present
  useEffect(() => {
    fetch("api/auth/verify", {
      method: "GET",
    }).then(async (res) => {
      const response = await res.json();
      if (response.message === "not okay") {
        router.replace("/");
      }
    });
  }, [router]);

  const getDate = () => {
    const date = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNum = date.getDate();
    const suffix = getSuffix(dateNum);
    const year = date.getFullYear();

    return `${day}. ${month} ${dateNum}${suffix}, ${year}`;
  };

  const getSuffix = (dateNum: number) => {
    if (dateNum >= 11 && dateNum <= 13) {
      return "th";
    }
    switch (dateNum % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hours = date.getHours() % 12 || 12;
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      const amOrPm = date.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes}:${seconds} ${amOrPm}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const studentData = useStudent();
  useEffect(() => {
    if (studentData) {
      setIsLoading(false);
    }
  }, [studentData]);

  const handleLogout = () => {
    fetch("api/auth/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        router.replace("/");
      }
    });
  };

  return (
    <Fragment>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-100 dark:bg-zinc-900 px-6 pb-4">
                    <div className="flex h-32 shrink-0 items-center justify-center">
                      <Image
                        width={64}
                        height={64}
                        className="object-contain"
                        src={LOGO}
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    pathname === item.href
                                      ? "bg-gray-50 text-cyan-600"
                                      : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:hover:bg-zinc-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      pathname === item.href
                                        ? "text-cyan-600"
                                        : "text-gray-400 group-hover:text-cyan-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <Link
                            href="/doctor/profile"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-cyan-600"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600"
                              aria-hidden="true"
                            />
                            Settings
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-400 dark:border-zinc-600 bg-slate-100 dark:bg-zinc-900 px-6 pb-4">
            <div className="flex h-32 shrink-0 items-center justify-center">
              <Image
                width={64}
                height={64}
                className="object-contain"
                src={LOGO}
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            pathname === item.href
                              ? "bg-gray-50 dark:bg-zinc-950 text-cyan-600"
                              : "text-gray-700 dark:text-gray-500 hover:text-cyan-600 hover:bg-gray-50 dark:hover:bg-zinc-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              pathname === item.href
                                ? "text-cyan-600"
                                : "text-gray-400 dark:text-gray-600 group-hover:text-cyan-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                          {item.name === "Class Timetable" && (
                            <span className="ml-auto text-xs font-semibold bg-red-500 text-red-200 animate-pulse rounded-full px-3 py-1">
                              HOT
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <div className="w-full flex items-center justify-center">
                    <ThemeSwitcher />
                  </div>

                  {/* <Link
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-500 hover:bg-gray-50 hover:bg-zinc-800 hover:text-cyan-600"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 dark:text-gray-600 group-hover:text-cyan-600"
                      aria-hidden="true"
                    />
                    Settings
                  </Link> */}
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-400 dark:border-zinc-600 bg-slate-100 dark:bg-zinc-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="relative flex items-center gap-5 flex-1 text-xs md:text-sm">
                <h1 className="text-zinc-900 dark:text-slate-100 font-bold">
                  {getDate()}
                </h1>
                <h2 className="text-zinc-900 dark:text-slate-100 font-bold">
                  {currentTime}
                </h2>
              </div>
              {/* <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 dark:text-gray-600"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="bg-slate-100 dark:bg-zinc-900 block h-full w-full border-0 py-0 pl-8 pr-0 text-zinc-800 dark:text-slate-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form> */}
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-zinc-600"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    {isLoading ? (
                      <>
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-zinc-600 animate-pulse" />
                        <div className="h-5 w-48 rounded-sm bg-gray-200 dark:bg-zinc-600 animate-pulse ml-4" />
                        <ChevronDownIcon
                          className="ml-2 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="h-8 w-8 rounded-full bg-gray-50"
                          src={studentData?.imageURL}
                          alt=""
                        />
                        <span className="hidden lg:flex lg:items-center">
                          <span
                            className="ml-4 text-sm font-semibold leading-6 text-zinc-800 dark:text-slate-200"
                            aria-hidden="true"
                          >
                            {studentData?.name}
                          </span>
                          <ChevronDownIcon
                            className="ml-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </>
                    )}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      onClick={handleLogout}
                      className="absolute cursor-pointer px-3 right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md text-zinc-900 bg-white hover:bg-slate-300 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                    >
                      Log out
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="lg:overflow-x-hidden">{children}</main>
        </div>
      </div>
    </Fragment>
  );
}
