import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import capitalize from "capitalize";
import classNames from "classnames";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import { useEffect, useState } from "react";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import { Controller } from "react-hook-form";

// eslint-disable-next-line react/prop-types
const EditorInput = ({ field: { onChange } }) => {
  const [state, updateState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const value = stateToHTML(state.getCurrentContent());
    onChange(value);
  }, [onChange, state]);

  return (
    <DraftEditor
      editorState={state}
      onEditorStateChange={updateState}
      toolbar={{
        options: ["inline", "blockType"],
        inline: {
          options: ["bold", "italic", "underline", "strikethrough"],
          bold: { className: "bordered-option-classname" },
          italic: { className: "bordered-option-classname" },
          underline: { className: "bordered-option-classname" },
          strikethrough: { className: "bordered-option-classname" },
          code: { className: "bordered-option-classname" },
        },
        blockType: {
          className: "bordered-option-classname",
        },
        fontSize: {
          className: "bordered-option-classname",
        },
        fontFamily: {
          className: "bordered-option-classname",
        },
      }}
    />
  );
};

const Editor = ({ name, label, control, errors }) => {
  const error = pathOr("", [name, "message"])(errors);

  return (
    <div>
      <p
        className={classNames(
          "mb-1.5 block text-xs text-gray-400 transition-all",
          {
            "text-red-500": error,
          }
        )}
      >
        {label}
      </p>
      <div className="rounded border border-black">
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
