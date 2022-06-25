import PropTypes from "prop-types";

const Step = ({ title, children, hideLine }) => {
  return (
    <div className="pt-3">
      <div className="relative pb-8">
        {!hideLine && (
          <span className="absolute top-3 left-5 -ml-px h-full w-0.5 bg-black" />
        )}

        <div className="relative flex items-start space-x-3">
          <div className="relative px-1">
            <div className="mx-2.5 flex h-3 w-3 items-center justify-center rounded-full bg-black">
              <div className="h-2 w-2 rounded-full bg-theme-orange" />
            </div>
          </div>
          <div className="min-w-0 flex-1 -translate-y-2.5">
            <p className="font-display text-xl font-medium text-gray-900">
              {title}
            </p>
            <div className="mt-4 text-sm text-gray-700">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step;

Step.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  hideLine: PropTypes.bool,
};

Step.defaultProps = {
  hideLine: false,
};
