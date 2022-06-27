import { Disclosure, Transition } from "@headlessui/react";
import { DuplicateIcon } from "@heroicons/react/outline";
import { CheckIcon, ChevronDownIcon, MailIcon } from "@heroicons/react/solid";
import classNames from "classnames";

import Button from "../../../../components/button";

const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing abou1t Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing2 about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

const Submissions = () => {
  return (
    <div className="relative w-2/3">
      <p className="font-display text-3xl">Submissions Received</p>
      <div className="mt-8 rounded-md bg-white p-6 pt-0 shadow">
        <dl className="space-y-6 divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={faq.question} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <div className="relative flex w-full items-start justify-between text-left">
                      <p className="flex h-10 min-w-[40px] items-center justify-center rounded-md bg-theme-orange font-display text-2xl text-black">
                        {(index + 1).toString().padStart(2, "0")}
                      </p>
                      <div className="relative flex-1 overflow-hidden px-4">
                        <div className="mb-1.5 flex">
                          <p className="mr-2 block w-full overflow-hidden text-ellipsis text-sm font-semibold">
                            0x5DD8B67FEa9D8F8Bc6c3350x5DD8B67FEa9D8F8Bc6c3350x5DD8B67FEa9D8F8Bc6c3350x5DD8B67FEa9D8F8Bc6c3350x5DD8B67FEa9D8F8Bc6c3350x5DD8B67FEa9D8F8Bc6c335
                          </p>
                          <Button className="border-0 !p-0">
                            <div className="rounded-md bg-gray-100 p-1">
                              <DuplicateIcon className="h-3 w-3" />
                            </div>
                          </Button>
                          <div className="flex flex-1 items-center whitespace-nowrap px-16">
                            <p className="mr-3 text-xs">Mark as Reviewed</p>
                            <Button className="border-0 !p-0">
                              <div className="rounded-sm bg-black text-white">
                                <CheckIcon className="h-4 w-4" />
                              </div>
                            </Button>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <a
                              key={`social-${i}`}
                              className="flex items-center"
                              href="#"
                            >
                              <MailIcon className="mr-1 h-3 w-3" />
                              <p className="text-xs underline">yash#1234</p>
                            </a>
                          ))}
                        </div>
                      </div>
                      <Disclosure.Button>
                        <div className="rounded-full bg-gray-500 text-white">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-5 w-5 transform"
                            )}
                          />
                        </div>
                      </Disclosure.Button>
                    </div>
                  </dt>
                  <Transition
                    show={open}
                    enter="transition ease-out"
                    enterFrom="transform opacity-0"
                    enterTo="transform opacity-100"
                    leave="transition ease-out"
                    leaveFrom="transform opacity-100"
                    leaveTo="transform opacity-0"
                  >
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="mt-8 flex space-x-16 text-sm">
                        <div className="flex-1">
                          <p className="text-xs">Links Submitted</p>
                          <ol className="mt-2 space-y-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <a
                                key={`social-${i}`}
                                className="flex items-center text-[#3D68AD]"
                                href="https://google.com"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <li className="text-xs underline">
                                  https://figma.com/file/7y3e7yd7yd8f7ydf87ydf87yd8....
                                </li>
                              </a>
                            ))}
                          </ol>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs">Files Submitted</p>
                          <ol className="mt-2 space-y-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <a
                                key={`social-${i}`}
                                className="flex items-center text-[#3D68AD]"
                                href="https://google.com"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <li className="text-xs underline">
                                  File 1.jpg
                                </li>
                              </a>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Submissions;
