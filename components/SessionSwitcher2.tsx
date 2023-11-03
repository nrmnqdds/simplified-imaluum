"use client";

import { Fragment, useState, useEffect, useContext } from "react";
import { ImaluumContext } from "@/app/context/ImaluumProvider";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const predefinedColors = [
  "bg-red-200 text-red-700 border-red-500 hover:bg-red-300 hover:text-red-800",
  "bg-sky-200 text-sky-700 border-sky-500 hover:bg-sky-300 hover:text-sky-800",
  "bg-purple-200 text-purple-700 border-purple-500 hover:bg-purple-300 hover:text-purple-800",
  "bg-orange-200 text-orange-700 border-orange-500 hover:bg-orange-300 hover:text-orange-800",
  "bg-lime-200 text-lime-700 border-lime-500 hover:bg-lime-300 hover:text-lime-800",
  "bg-yellow-200 text-yellow-700 border-yellow-500 hover:bg-yellow-300 hover:text-yellow-800",
  "bg-emerald-200 text-emerald-700 border-emerald-500 hover:bg-emerald-300 hover:text-emerald-800",
  "bg-pink-200 text-pink-700 border-pink-500 hover:bg-pink-300 hover:text-pink-800",
  "bg-indigo-200 text-indigo-700 border-indigo-500 hover:bg-indigo-300 hover:text-indigo-800",
  "bg-stone-200 text-stone-700 border-stone-500 hover:bg-stone-300 hover:text-stone-800",
];

export default function SessionSwitcher2({ setEvents, context }) {
  const [selected, setSelected] = useState(context?.courses[0].sessionName);
  const [coloredEvents, setColoredEvents] = useState<Subject[]>();

  useEffect(() => {
    const titleToColorMap = {}; // Map event titles to colors

    if (context && context.courses) {
      const mappedEvents = context.courses.map((course) => {
        const eventsWithColor = course?.schedule.map((event) => {
          let _color = titleToColorMap[event.courseCode];
          if (!_color) {
            // If no color assigned for this title, find an available color
            const availableColors = predefinedColors.filter(
              (c) => !Object.values(titleToColorMap).includes(c)
            );

            if (availableColors.length > 0) {
              // If there are available colors, pick one randomly
              const randomColorIndex = Math.floor(
                Math.random() * availableColors.length
              );
              _color = availableColors[randomColorIndex];
            } else {
              // If all colors have been used, assign a random color from predefinedColors
              const randomColorIndex = Math.floor(
                Math.random() * predefinedColors.length
              );
              _color = predefinedColors[randomColorIndex];
            }

            // Store the assigned color for this title
            titleToColorMap[event.courseCode] = _color;
          }
          return {
            ...event,
            color: _color,
          };
        });

        return { ...course, schedule: eventsWithColor };
      });

      setColoredEvents(mappedEvents);
    }
  }, [context, setEvents]);

  useEffect(() => {
    // console.log("selected", selected);
    if (coloredEvents) {
      const selectedEvents = coloredEvents.filter(
        (course) => course?.sessionName === selected
      );
      // console.log("selectedEvents", selectedEvents);
      setEvents(selectedEvents);
    }
  }, [coloredEvents, selected, setEvents]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-green-600 py-2 pl-3 pr-10 text-left text-slate-100 shadow-sm ring-1 ring-inset ring-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-slate-100"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-green-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {context?.courses.map((course, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-green-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={course.sessionName}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {course.sessionName}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
