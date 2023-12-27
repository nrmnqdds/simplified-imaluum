import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import DARKDEMOPIC from "@/public/darkdemo.png";
import LIGHTDEMOPIC from "@/public/lightdemo.png";
import LOGO from "@/public/logo-landing-page.png";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "../LoginForm";

const Hero = () => {
  return (
    <section className="relative">
      <ThemeSwitcher className="absolute top-2 right-5" />
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 dark:stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-zinc-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl">
          <Image
            width={48}
            height={48}
            className="object-contain"
            src={LOGO}
            alt="Your Company"
          />
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <span className="mr-2 rounded-full bg-yellow-500/10 px-3 py-2 text-sm font-semibold leading-6 text-yellow-600 dark:text-yellow-400 ring-1 ring-inset ring-indigo-500/20">
              In construction
            </span>
            <Link
              href="https://github.com/qryskalyst20/simplified-imaluum"
              target="_blank"
              className="inline-flex space-x-6"
            >
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold leading-6 text-cyan-600 dark:text-cyan-400 ring-1 ring-inset ring-indigo-500/20">
                What&apos;s new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-zinc-800 dark:text-slate-200">
                <span>Just shipped v2.0</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-zinc-500"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-zinc-800 dark:text-slate-200 sm:text-6xl">
            Simplified iMa&apos;luum
          </h1>
          <p className="mt-3 text-lg leading-8 text-zinc-800 dark:text-slate-200">
            A simplified version of i-Ma&apos;luum for students. An attempt to
            make i-Ma&apos;luum more user-friendly.
          </p>

          <LoginForm />
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <Image
              src={LIGHTDEMOPIC}
              alt="App screenshot"
              width={1232}
              height={242}
              className="rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 dark:hidden block"
            />
            <Image
              src={DARKDEMOPIC}
              alt="App screenshot"
              width={1232}
              height={242}
              className="rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 hidden dark:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
