import { Disclosure, Transition } from "@headlessui/react";
import { DuplicateIcon } from "@heroicons/react/outline";
import { CheckIcon, ChevronDownIcon, MailIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import PropTypes from "prop-types";

import Button from "../../../../components/button";

const Submissions = ({ submissions, reviewSubmissions }) => {
  return (
    <div className="relative w-1/2 flex-1">
      <p className="font-display text-3xl">Submissions Received</p>
      <div className="mt-8 rounded-md bg-white p-6 pt-0 shadow">
        <dl className="space-y-6 divide-y divide-gray-200">
          {submissions.map(
            (
              {
                wallet,
                reviewed,
                discord,
                twitter,
                telegram,
                email,
                links,
                files,
              },
              index
            ) => (
              <Disclosure as="div" key={wallet} className="pt-6">
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
                              {wallet}
                            </p>
                            <Button className="border-0 !p-0">
                              <div className="rounded-md bg-gray-100 p-1">
                                <DuplicateIcon className="h-3 w-3" />
                              </div>
                            </Button>
                            <div className="flex flex-1 items-center whitespace-nowrap px-16">
                              <p className="mr-3 text-xs">Mark as Reviewed</p>
                              <Button
                                className="border-0 !p-0"
                                onClick={() =>
                                  reviewSubmissions(wallet, !reviewed)
                                }
                              >
                                {!reviewed ? (
                                  <div className="rounded-sm border border-gray-400 bg-white text-transparent">
                                    <CheckIcon className="h-4 w-4" />
                                  </div>
                                ) : (
                                  <div className="rounded-sm  border border-black bg-black text-white">
                                    <CheckIcon className="h-4 w-4" />
                                  </div>
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className="flex space-x-4">
                            {[
                              {
                                key: "discord",
                                icon: <MailIcon className="mr-1 h-3 w-3" />,
                                value: discord,
                                url: discord,
                              },
                              {
                                key: "twitter",
                                icon: <MailIcon className="mr-1 h-3 w-3" />,
                                value: twitter,
                                url: twitter,
                              },
                              {
                                key: "email",
                                icon: <MailIcon className="mr-1 h-3 w-3" />,
                                value: email,
                                url: email,
                              },
                              {
                                key: "telegram",
                                icon: <MailIcon className="mr-1 h-3 w-3" />,
                                value: telegram,
                                url: telegram,
                              },
                            ].map(({ key, icon, url, value }) => (
                              <a
                                key={key}
                                className="flex items-center"
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {icon}
                                <p className="text-xs underline">{value}</p>
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
                              {links.map((link) => (
                                <a
                                  key={link}
                                  className="flex items-center text-[#3D68AD]"
                                  href={link}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <li className="text-xs underline">{link}</li>
                                </a>
                              ))}
                            </ol>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs">Files Submitted</p>
                            <ol className="mt-2 space-y-2">
                              {files.map((file) => (
                                <a
                                  key={file}
                                  className="flex items-center text-[#3D68AD]"
                                  href={file}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <li className="text-xs underline">{file}</li>
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
            )
          )}
        </dl>
      </div>
    </div>
  );
};

export default Submissions;

Submissions.propTypes = {
  submissions: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      discord: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      files: PropTypes.arrayOf(PropTypes.string).isRequired,
      links: PropTypes.arrayOf(PropTypes.string).isRequired,
      reviewed: PropTypes.bool.isRequired,
      telegram: PropTypes.string.isRequired,
      twitter: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      wallet: PropTypes.string.isRequired,
    })
  ),
  reviewSubmissions: PropTypes.func.isRequired,
};

Submissions.defaultProps = {
  submissions: [],
};
