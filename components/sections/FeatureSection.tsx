import LIGHTDEMOPIC from "@/public/imaluum.nrmnqdds.com_schedule (1).png";
import DARKDEMOPIC from "@/public/imaluum.nrmnqdds.com_schedule.png";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { ContainerScroll } from "../ui/container-scroll-animation";

const features = [
  {
    name: "Sleek Design.",
    description:
      "A modern design that will make you feel comfortable using it.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Privacy first.",
    description:
      "I don't store database. This app acts as a puppeteer between you and the official source.",
    icon: LockClosedIcon,
  },
  {
    name: "Up to date.",
    description:
      "Real-time data. You can see the latest data updates from the official source.",
    icon: ArrowPathIcon,
  },
  {
    name: "Simplicity.",
    description:
      "Serves only the most important information. No more, no less.",
    icon: FingerPrintIcon,
  },
  {
    name: "We are open source.",
    description: "You can check the code yourself on Github.",
    icon: Cog6ToothIcon,
  },
  {
    name: "More features.",
    description: "More features will be added in the future. Stay tuned!",
    icon: ServerIcon,
  },
];

const Feature = () => {
  return (
    <section
      id="feature"
      className="bg-slate-100 dark:bg-zinc-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 md:hidden">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 dark:text-cyan-500 text-cyan-600">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-800 dark:text-slate-200 sm:text-4xl">
            i-Ma&apos;luum, but on steroid!
          </p>
          <p className="mt-6 text-lg leading-8 text-zinc-800 dark:text-slate-200">
            Bored with the old i-Ma&apos;luum? Try this one! It&apos;s more
            user-friendly and has a lot of features that you will love.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 md:hidden">
          <Image
            src={LIGHTDEMOPIC}
            alt="App screenshot"
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10 dark:hidden block"
            width={1232}
            height={242}
          />
          <Image
            src={DARKDEMOPIC}
            alt="App screenshot"
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10 hidden dark:block"
            width={1232}
            height={242}
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-slate-100 dark:from-zinc-900 pt-[7%]" />
          </div>
        </div>
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-cyan-600">
                Everything you need <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-foreground">
                  i-Ma&apos;luum on steroid!
                </span>
              </h1>
            </>
          }
        />
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-0 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 dark:text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-zinc-900 dark:text-slate-200">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-cyan-600 dark:text-cyan-500"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Feature;
