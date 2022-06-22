import capitalize from "capitalize";
import classNames from "classnames";
import PropTypes from "prop-types";
import { pathOr } from "ramda";

export const Input = ({
  register,
  errors,
  name,
  label,
  className,
  ...props
}) => {
  const error = pathOr("", [name, "message"])(errors);

  return (
    <div>
      <label className="block text-gray-700">
        <p
          className={classNames(
            "mb-1.5 block text-xs text-gray-400 transition-all empty:hidden",
            {
              "text-red-500": error,
            }
          )}
        >
          {label}
        </p>
        <input
          {...props}
          className={classNames(
            `w-full rounded border-2 p-2 font-light focus:outline-none focus:ring-0`,
            {
              "border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500":
                error,
            },
            className
          )}
          {...register(name)}
        />
      </label>
      <p className="mt-2 ml-1 block text-xs text-red-500 empty:hidden">
        {capitalize(error)}
      </p>
    </div>
  );
};

export default Input;

Input.propTypes = {
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  errors: {},
  label: "",
  className: "",
};
