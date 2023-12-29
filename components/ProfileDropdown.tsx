"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import useProfile from "@/hooks/useProfile";
import { ImaluumLogout } from "@/lib/server/auth";
import { QueryCache } from "@tanstack/react-query";
import toast from "react-hot-toast";

const queryCache = new QueryCache();

const ProfileDropdown = () => {
  const { profile } = useProfile();

  const router = useRouter();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        {!profile ? (
          <>
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-zinc-600 animate-pulse" />
            <div className="hidden md:block h-5 w-48 rounded-sm bg-gray-200 dark:bg-zinc-600 animate-pulse ml-4" />
            <ChevronDownIcon
              className="ml-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src={profile?.imageURL}
              alt="gambarstudent"
            />
            <span className="hidden md:flex lg:items-center">
              <span
                className="ml-4 text-sm font-semibold leading-6 text-zinc-800 dark:text-slate-200"
                aria-hidden="true"
              >
                {profile?.name}
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
          onClick={async () => {
            const res = await ImaluumLogout();
            if (res.success) {
              sessionStorage.clear();
              queryCache.clear();
              toast.success("Logged out successfully.");
              router.replace("/");
            }
          }}
          className="absolute cursor-pointer px-3 right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md text-zinc-900 bg-white hover:bg-slate-300 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
        >
          Log out
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
