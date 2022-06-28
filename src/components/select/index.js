import capitalize from "capitalize";
import classNames from "classnames";
import PropTypes from "prop-types";
import { pathOr } from "ramda";

export const Select = ({
  register,
  errors,
  name,
  label,
  className,
  labelClassName,
  options,
}) => {
  const error = pathOr("", [name, "message"])(errors);

  return (
    <div>
      <p
        className={classNames(
          "mb-1.5 block text-xs text-gray-400 transition-all empty:hidden",
          labelClassName
        )}
      >
        {label}
      </p>
      <select
        className={classNames(
          "w-full rounded border border-black p-2 focus:outline-none focus:ring-0",
          className
        )}
        {...register(name)}
      >
        <option value="" disabled selected>
          Select
        </option>
        {options.map((option) => (
          <option key={option.key}>{option.value}</option>
        ))}
      </select>
      <p className="mt-2 ml-1 block text-xs text-red-500 empty:hidden">
        {capitalize(error)}
      </p>
    </div>
  );
};

export default Select;

Select.defaultProps = {
  name: "",
  register: () => {},
  errors: {},
  label: "",
  className: "",
  labelClassName: "",
};

Select.propTypes = {
  register: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
};
