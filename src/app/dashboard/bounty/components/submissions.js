import { Disclosure, Transition } from "@headlessui/react";
import { DuplicateIcon } from "@heroicons/react/outline";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactTooltip from "react-tooltip";

import Button from "../../../../components/button";

const Submissions = ({ submissions, reviewSubmissions }) => {
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(""), 1000);
    }
  }, [copied]);

  return (
    <div className="relative w-1/2 flex-1">
      <p className="font-display text-3xl">Submissions Received</p>
      <div className="mt-8 rounded-md bg-white p-6 pt-0 shadow">
        <dl className="space-y-6 divide-y divide-gray-200">
          {!submissions.length && (
            <p className="pt-6 text-sm">No submissions made yet.</p>
          )}
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
                            <p className="mr-2 block flex w-full items-center justify-start overflow-hidden text-ellipsis text-sm font-semibold">
                              {wallet}
                              <CopyToClipboard
                                text={wallet}
                                onCopy={() => setCopied("Copy Wallet Address")}
                              >
                                <div
                                  className="ml-2 rounded-md bg-gray-100 p-1"
                                  data-tip="Copy Wallet Address"
                                >
                                  <DuplicateIcon className="h-3 w-3" />
                                </div>
                              </CopyToClipboard>
                            </p>

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
                                icon: (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16.449"
                                    height="18.799"
                                    viewBox="0 0 16.449 18.799"
                                  >
                                    <path d="M10.913,8.929a.962.962,0,1,1-.959-1.043A1,1,0,0,1,10.913,8.929ZM6.523,7.886a1.047,1.047,0,0,0,0,2.087,1,1,0,0,0,.959-1.043A1,1,0,0,0,6.523,7.886Zm9.926-5.95V18.8c-2.368-2.093-1.611-1.4-4.361-3.957l.5,1.739H1.927A1.932,1.932,0,0,1,0,14.644V1.936A1.932,1.932,0,0,1,1.927,0h12.6A1.932,1.932,0,0,1,16.449,1.936ZM13.77,10.847a12.587,12.587,0,0,0-1.354-5.48A4.648,4.648,0,0,0,9.775,4.38l-.132.15a6.256,6.256,0,0,1,2.34,1.194,7.987,7.987,0,0,0-7.021-.273c-.348.16-.555.273-.555.273A6.341,6.341,0,0,1,6.88,4.493L6.786,4.38a4.648,4.648,0,0,0-2.641.987,12.587,12.587,0,0,0-1.354,5.48,3.408,3.408,0,0,0,2.867,1.429s.348-.423.63-.78a2.923,2.923,0,0,1-1.645-1.109c.138.1.366.222.385.235a6.852,6.852,0,0,0,5.865.329,5.379,5.379,0,0,0,1.081-.555,2.966,2.966,0,0,1-1.7,1.119c.282.357.62.761.62.761A3.436,3.436,0,0,0,13.77,10.847Z" />
                                  </svg>
                                ),
                                value: discord,
                              },
                              {
                                key: "twitter",
                                icon: (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18.799"
                                    height="15.268"
                                    viewBox="0 0 18.799 15.268"
                                  >
                                    <path
                                      d="M16.866,7.186c.012.167.012.334.012.5A10.887,10.887,0,0,1,5.916,18.649,10.888,10.888,0,0,1,0,16.919a7.97,7.97,0,0,0,.93.048,7.716,7.716,0,0,0,4.783-1.646,3.86,3.86,0,0,1-3.6-2.672,4.859,4.859,0,0,0,.728.06,4.075,4.075,0,0,0,1.014-.131A3.853,3.853,0,0,1,.763,8.8V8.748A3.88,3.88,0,0,0,2.5,9.237,3.859,3.859,0,0,1,1.312,4.085,10.951,10.951,0,0,0,9.256,8.116a4.349,4.349,0,0,1-.1-.883A3.856,3.856,0,0,1,15.829,4.6a7.585,7.585,0,0,0,2.445-.93A3.842,3.842,0,0,1,16.58,5.79a7.724,7.724,0,0,0,2.219-.6,8.282,8.282,0,0,1-1.932,1.992Z"
                                      transform="translate(0 -3.381)"
                                    />
                                  </svg>
                                ),
                                value: twitter,
                              },
                              {
                                key: "email",
                                icon: (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16.449"
                                    height="12.924"
                                    viewBox="0 0 16.449 12.924"
                                  >
                                    <path
                                      d="M17.132,5.625H3.817A1.571,1.571,0,0,0,2.25,7.192v9.791a1.571,1.571,0,0,0,1.567,1.567H17.132A1.571,1.571,0,0,0,18.7,16.983V7.192A1.571,1.571,0,0,0,17.132,5.625Zm-.2,3.329-6.462,4.308L4.012,8.954V7.387L10.474,11.7l6.462-4.308Z"
                                      transform="translate(-2.25 -5.625)"
                                    />
                                  </svg>
                                ),
                                value: email,
                              },
                              {
                                key: "telegram",
                                icon: (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18.792"
                                    height="15.769"
                                    viewBox="0 0 18.792 15.769"
                                  >
                                    <path
                                      d="M18.722,4.346,15.895,17.7c-.2.948-.768,1.175-1.567.736L10.02,15.249,7.936,17.262a1.1,1.1,0,0,1-.862.439c-.564,0-.47-.211-.658-.744L4.929,12.108.66,10.777c-.924-.274-.932-.909.2-1.371L17.516,2.983c.76-.337,1.488.188,1.2,1.355Z"
                                      transform="translate(0.013 -2.883)"
                                    />
                                  </svg>
                                ),
                                value: telegram,
                              },
                            ].map(({ key, icon, value }) =>
                              !value ? null : (
                                <CopyToClipboard
                                  text={value}
                                  key={key}
                                  onCopy={() => setCopied(value)}
                                >
                                  <div
                                    className="flex cursor-pointer items-center"
                                    data-tip={value}
                                  >
                                    <span className="mr-0.5 scale-75">
                                      {icon}
                                    </span>
                                    <p className="text-xs underline">{value}</p>
                                  </div>
                                </CopyToClipboard>
                              )
                            )}
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
      <ReactTooltip
        getContent={(value) => {
          return copied === value ? "Copied!" : value;
        }}
      />
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
