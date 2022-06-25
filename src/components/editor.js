import "react-quill/dist/quill.snow.css";

import capitalize from "capitalize";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";

// eslint-disable-next-line react/prop-types
const EditorInput = ({ field: { value, onChange } }) => {
  return <ReactQuill value={value || ""} onChange={onChange} />;
};

const Editor = ({ name, label, control, errors }) => {
  const error = pathOr("", [name, "message"])(errors);

  return (
    <div>
      <p className="mb-1.5 block text-xs text-gray-400 transition-all">
        {label}
      </p>
      <div className="rounded border border-black bg-white">
        <Controller name={name} control={control} render={EditorInput} />
      </div>
      <p className="mt-2 ml-1 block text-xs text-red-500">
        {capitalize(error)}
      </p>
    </div>
  );
};

export default Editor;

Editor.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.object.isRequired,
};

Editor.defaultProps = {
  errors: {},
  label: "",
};
