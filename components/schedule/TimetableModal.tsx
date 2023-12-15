import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import moment from "moment";

export default function TimetableModal({
  openModal,
  setOpenModal,
  currentSubject,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  currentSubject?: Subject;
}) {
  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpenModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div> */}
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-zinc-900"
                  >
                    {currentSubject?.courseCode}
                  </Dialog.Title>
                  <div className="mt-0">
                    <p className="text-sm text-zinc-800">
                      {currentSubject?.courseName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 items-start mt-5">
                    <p className="text-sm text-zinc-800">
                      <span className="text-sm text-zinc-900 font-bold">
                        Time:{" "}
                      </span>
                      {moment(
                        currentSubject?.timestamps[0].start,
                        "HH:mm:ss"
                      ).format("h:mma")}{" "}
                      -{" "}
                      {moment(
                        currentSubject?.timestamps[0].end,
                        "HH:mm:ss"
                      ).format("h:mma")}
                    </p>
                    <p className="text-sm text-zinc-800">
                      <span className="text-sm text-zinc-900 font-bold">
                        Lecturer:{" "}
                      </span>
                      {currentSubject?.lecturer}
                    </p>
                    <p className="text-sm text-zinc-800">
                      <span className="text-sm text-zinc-900 font-bold">
                        Section:{" "}
                      </span>
                      {currentSubject?.section}
                    </p>
                    <p className="text-sm text-zinc-800">
                      <span className="text-sm text-zinc-900 font-bold">
                        Credit Hour:{" "}
                      </span>
                      {currentSubject?.chr}
                    </p>
                    <p className="text-sm text-zinc-800">
                      <span className="text-sm text-zinc-900 font-bold">
                        Location:{" "}
                      </span>
                      {currentSubject?.venue}
                    </p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpenModal(false)}
                  >
                    Exit
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
