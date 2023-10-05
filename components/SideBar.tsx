"use client";

import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";

function SideNavbar() {
  const router = useRouter();
  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-zinc-800  dark:text-slate-200 hover:bg-zinc-900 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-100 group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-slate-200 dark:bg-zinc-950 z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-zinc-800 dark:border-zinc-100 pb-4 w-full">
              Virtual Dashboard
            </h1>
            <div className=" my-4 border-b border-zinc-800 dark:border-zinc-100 pb-4">
              <div
                onClick={() => router.replace("/dashboard")}
                className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-zinc-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <MdOutlineSpaceDashboard className="text-2xl text-zinc-600 group-hover:text-slate-200 " />
                <h3 className="text-base text-zinc-800 dark:text-slate-200 group-hover:text-slate-200 font-semibold ">
                  Dashboard
                </h3>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-zinc-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <CgProfile className="text-2xl text-zinc-600 group-hover:text-slate-200 " />
                <h3 className="text-base text-zinc-800 dark:text-slate-200 group-hover:text-slate-200 font-semibold ">
                  Profile
                </h3>
              </div>
              <div
                onClick={() => router.replace("/schedule")}
                className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-zinc-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <FaRegComments className="text-2xl text-zinc-600 group-hover:text-slate-200 " />
                <h3 className="text-base text-zinc-800 dark:text-slate-200 group-hover:text-slate-200 font-semibold ">
                  Class Timetable
                </h3>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-zinc-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineAnalytics className="text-2xl text-zinc-600 group-hover:text-slate-200 " />
                <h3 className="text-base text-zinc-800 dark:text-slate-200 group-hover:text-slate-200 font-semibold ">
                  Analytics
                </h3>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-zinc-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <BiMessageSquareDots className="text-2xl text-zinc-600 group-hover:text-slate-200 " />
                <h3 className="text-base text-zinc-800 dark:text-slate-200 group-hover:text-slate-200 font-semibold ">
                  Messages
                </h3>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-zinc-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineIntegrationInstructions className="text-2xl text-zinc-600 group-hover:text-slate-200 " />
                <h3 className="text-base text-zinc-800 dark:text-slate-200 group-hover:text-slate-200 font-semibold ">
                  Integration
                </h3>
              </div>
            </div>
            {/* setting  */}
            <div className=" my-4 border-b border-zinc-800 dark:border-zinc-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-zinc-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSettings className="text-2xl text-zinc-600 group-hover:text-slate-200 " />
                <h3 className="text-base text-zinc-800 dark:text-slate-200 group-hover:text-slate-200 font-semibold ">
                  Settings
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-zinc-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineMoreHoriz className="text-2xl text-zinc-600 group-hover:text-slate-200 " />
                <h3 className="text-base text-zinc-800 dark:text-slate-200 group-hover:text-slate-200 font-semibold ">
                  More
                </h3>
              </div>
            </div>
            {/* logout */}
            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-zinc-200  hover:bg-zinc-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-zinc-600 group-hover:text-slate-200 " />
                <h3 className="text-base text-zinc-800 dark:text-slate-200 group-hover:text-slate-200 font-semibold ">
                  Logout
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
