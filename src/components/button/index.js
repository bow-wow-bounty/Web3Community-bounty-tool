import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Fragment, useCallback, useRef, useState } from "react";
import { useErrorHandler } from "react-error-boundary";

import useToggle from "../../hooks/use-toggle";

export const ButtonVariant = {
  Primary: "PRIMARY",
  PrimaryBW: "PRIMARY-B/W",
  Secondary: "SECONDARY",
  SecondaryBW: "SECONDARY_B/W",
  Plain: "PLAIN",
};

export const Button = ({
  children,
  onClick,
  className,
  withConfirmation,
  confirmationMessage,
  variant,
  ...props
}) => {
  const handleError = useErrorHandler();
  const resolveButtonRef = useRef(null);
  const [processing, toggleProcessing] = useToggle(false);
  const [confirmationResolvers, setConfirmationResolvers] = useState(null);

  const handler = useCallback(
    async (event) => {
      const cb = async () => {
        try {
          toggleProcessing(true);
          await onClick(event);
        } catch (error) {
          handleError(error);
        } finally {
          toggleProcessing(false);
        }
      };

      if (withConfirmation) {
        const resolvers = {
          resolve: () => undefined,
          reject: () => undefined,
        };

        new Promise((resolve, reject) => {
          resolvers.resolve = resolve;
          resolvers.reject = reject;
        })
          .then(() => {
            cb();
          })
          .catch(() => undefined)
          .finally(() => {
            setConfirmationResolvers(null);
          });

        setConfirmationResolvers(resolvers);
      } else {
        await cb();
      }
    },
    [handleError, onClick, toggleProcessing, withConfirmation]
  );

  return (
    <button
      type="button"
      {...props}
      onClick={handler}
      className={classNames(
        className,
        "inline-flex items-center rounded-md border px-4 py-2 font-display text-base font-medium transition-all active:scale-95",
        {
          "border-transparent bg-theme-orange shadow-sm hover:bg-yellow-500":
            variant === ButtonVariant.Primary,
          "border-transparent bg-black text-white shadow-sm":
            variant === ButtonVariant.PrimaryBW,
          "border-gray-300 bg-white shadow-sm hover:bg-gray-50":
            variant === ButtonVariant.Secondary,
          "cursor-not-allowed shadow-none active:scale-100 disabled:bg-none disabled:opacity-50":
            processing || props.disabled,
        }
      )}
      disabled={props.disabled || Boolean(processing)}
    >
      {children}

      <Transition.Root show={Boolean(confirmationResolvers)} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={resolveButtonRef}
          onClose={() => setConfirmationResolvers(null)}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Confirmation
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {confirmationMessage}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 justify-end sm:mt-4 sm:flex sm:flex-row">
                  <button
                    type="button"
                    className="mx-4 inline-flex w-24 justify-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                    onClick={() => confirmationResolvers?.reject()}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-24 justify-center rounded-md border border-gray-300 bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:text-sm"
                    onClick={() => confirmationResolvers?.resolve()}
                    ref={resolveButtonRef}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </button>
  );
};

export default Button;

Button.defaultProps = {
  className: "",
  confirmationMessage: "Are you sure?",
  disabled: false,
  onClick: () => {},
  variant: ButtonVariant.Plain,
  withConfirmation: false,
};

Button.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  withConfirmation: PropTypes.bool,
  confirmationMessage: PropTypes.string,
  variant: PropTypes.string,
};
