import PropTypes from "prop-types";

// eslint-disable-next-line import/prefer-default-export
export const ChildrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
  PropTypes.func,
]);
