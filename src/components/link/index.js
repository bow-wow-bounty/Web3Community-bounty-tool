import classNames from "classnames";
import { default as NextLink } from "next/link";
import PropTypes from "prop-types";

export const Link = ({ href, children, className, noUnderline, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <a
        className={classNames(
          `cursor:pointer`,
          className,
          !noUnderline ? "hover:underline" : "no-underline"
        )}
        {...props}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;

Link.defaultProps = {
  className: "",
  noUnderline: true,
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  noUnderline: PropTypes.bool,
};
