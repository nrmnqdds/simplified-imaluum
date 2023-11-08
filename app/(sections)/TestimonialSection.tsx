const featuredTestimonial = {
  body: "This app helps me to manage my time and schedule. I can easily see my schedule and alert when will my class be. This app is very useful for me.",
  author: {
    name: "MUHAMMAD 'IZZAT BIN MOHD KHASBI",
    handle: "2211003",
    imageUrl:
      "https://italeemc.iium.edu.my/pluginfile.php/22311/user/icon/remui/f1?rev=136257",
    logoUrl: "https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg",
  },
};
const testimonials = [
  [
    [
      {
        body: "The app is so interactive and modern than the current one. It is easy to use and the UI is so clean and neat. I love it!",
        author: {
          name: "MUHAMMAD IHSAN SHAMIL",
          handle: "2215009",
          imageUrl:
            "https://italeemc.iium.edu.my/pluginfile.php/22342/user/icon/remui/f1?rev=61326",
        },
      },
      // More testimonials...
    ],
    [
      {
        body: "Hard to believe that this app is made by students. It is so good and I hope this app will be used by the whole IIUM community.",
        author: {
          name: "MUHAMMAD AFIQ",
          handle: "2214015",
          imageUrl:
            "https://italeemc.iium.edu.my/pluginfile.php/16098/user/icon/remui/f1?rev=136515",
        },
      },
      // More testimonials...
    ],
  ],
  [
    [
      {
        body: "Definitely recommending this app to my friends!",
        author: {
          name: "MUHAMMAD NURIMAN QUDDUS",
          handle: "2214227",
          imageUrl:
            "https://italeemc.iium.edu.my/pluginfile.php/22336/user/icon/remui/f1?rev=136547",
        },
      },
      // More testimonials...
    ],
    [
      {
        body: "It's finger licking good!",
        author: {
          name: "FADZWAN",
          handle: "2116337",
          imageUrl:
            "https://italeemc.iium.edu.my/pluginfile.php/16873/user/icon/remui/f1?rev=77362",
        },
      },
      // More testimonials...
    ],
  ],
];

//https://italeemc.iium.edu.my/pluginfile.php/16873/user/icon/remui/f1?rev=77362

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Testimonial = () => {
  return (
    <div className="relative isolate bg-slate-100 dark:bg-zinc-900 pb-32 pt-24 sm:pt-32">
      <div
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        aria-hidden="true"
      >
        <div
          className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight dark:text-cyan-500 text-cyan-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-slate-300 sm:text-4xl">
            Listens from our users <br />
            <i>mahallah-wide</i>
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-zinc-900 dark:text-slate-300 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <figure className="rounded-2xl bg-slate-100 dark:bg-zinc-800 shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
            <blockquote className="p-6 text-lg font-semibold leading-7 tracking-tight text-zinc-900 dark:text-slate-300 sm:p-12 sm:text-xl sm:leading-8">
              <p>{`“${featuredTestimonial.body}”`}</p>
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
              <img
                className="h-10 w-10 flex-none rounded-full bg-gray-50"
                src={featuredTestimonial.author.imageUrl}
                alt=""
              />
              <div className="flex-auto">
                <div className="font-semibold">
                  {featuredTestimonial.author.name}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{`@${featuredTestimonial.author.handle}`}</div>
              </div>
              <img
                className="h-10 w-auto flex-none"
                src={featuredTestimonial.author.logoUrl}
                alt=""
              />
            </figcaption>
          </figure>
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className="space-y-8 xl:contents xl:space-y-0"
            >
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? "xl:row-span-2"
                      : "xl:row-start-1",
                    "space-y-8"
                  )}
                >
                  {column.map((testimonial) => (
                    <figure
                      key={testimonial.author.handle}
                      className="rounded-2xl bg-slate-100 dark:bg-zinc-800 p-6 shadow-lg ring-1 ring-gray-900/5"
                    >
                      <blockquote className="text-zinc-900 dark:text-slate-300">
                        <p>{`“${testimonial.body}”`}</p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4">
                        <img
                          className="h-10 w-10 rounded-full bg-gray-50"
                          src={testimonial.author.imageUrl}
                          alt=""
                        />
                        <div>
                          <div className="font-semibold">
                            {testimonial.author.name}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">{`@${testimonial.author.handle}`}</div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
