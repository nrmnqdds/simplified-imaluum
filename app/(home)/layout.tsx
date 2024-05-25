"use client";

import ProfileDropdown from "@/components/ProfileDropdown";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import ImaluumProvider from "@/context/ImaluumProvider";
import { getDate } from "@/lib/common/time";
import LOGO from "@/public/logo-landing-page.png";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  Cog6ToothIcon,
  FlagIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Class Timetable", href: "/schedule", icon: CalendarIcon },
  { name: "Exam Results", href: "/result", icon: FlagIcon },
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
  const [currentTime, setCurrentTime] = useState<string>("00:00:00 AM");

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

  return (
    <ImaluumProvider>
      <div>
        <div className="w-full flex items-center justify-center bg-primary py-1 px-2">
          <h1 className="drop-shadow text-accent text-[10px] sm:text-sm">
            Incorrect data? Refresh! Sometimes the scraper misses. Sorry for the
            inconvenience. UIA pls support.
          </h1>
        </div>
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
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-4">
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
                      <ul className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    pathname === item.href
                                      ? "bg-gray-50 text-primary"
                                      : "text-gray-700 hover:text-primary hover:bg-gray-50 dark:hover:bg-zinc-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      pathname === item.href
                                        ? "text-primary"
                                        : "text-accent group-hover:text-primary",
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
                        {/* <li className="mt-auto">
                          <Link
                            href="/doctor/profile"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary"
                              aria-hidden="true"
                            />
                            Settings
                          </Link>
                        </li> */}
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
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-background px-6 pb-4">
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
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            pathname === item.href
                              ? "bg-primary-foreground text-primary"
                              : "text-accent hover:text-primary hover:bg-accent",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              pathname === item.href
                                ? "text-primary"
                                : "text-accent group-hover:text-primary",
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
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-500 hover:bg-gray-50 hover:bg-zinc-800 hover:text-primary"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 dark:text-gray-600 group-hover:text-primary"
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
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-accent lg:hidden"
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
                <h1 className="text-foreground font-bold">{getDate()}</h1>
                <h2 className="text-foreground font-bold">{currentTime}</h2>
              </div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-zinc-600"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <ProfileDropdown />
              </div>
            </div>
          </div>

          <main className="lg:overflow-x-hidden bg-background scrollbar-hide">
            {children}
          </main>
        </div>
      </div>
    </ImaluumProvider>
  );
}
