/* eslint-disable react/prop-types */
import capitalize from "capitalize";
import classNames from "classnames";
import Image from "next/image";
import { useS3Upload } from "next-s3-upload";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import { useCallback, useMemo, useState } from "react";
import { Controller } from "react-hook-form";

import Button, { ButtonVariant } from "../button";

const Input = ({ field: { value, onChange, error }, notImage }) => {
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const [processing, toggleProcessing] = useState(false);

  const handleFileChange = useCallback(
    async (file) => {
      toggleProcessing(true);
      const { url } = await uploadToS3(file);
      onChange(url);
      toggleProcessing(false);
    },
    [onChange, uploadToS3]
  );

  const clear = useCallback(() => onChange(""), [onChange]);

  const displayValue = useMemo(
    () => (!value ? "" : value.split("/").slice(-1)[0]),
    [value]
  );

  return (
    <>
      {!notImage && value && (
        <div className="relative mb-4 aspect-[5/3] w-1/2 overflow-hidden rounded">
          <Image layout="fill" src={value} alt="Cover" objectFit="cover" />
        </div>
      )}

      <FileInput onChange={handleFileChange} />

      <input
        value={displayValue}
        className={classNames(
          `pointer-events-none mb-4 w-full rounded border border-black p-2 font-light focus:outline-none focus:ring-0`,
          {
            "border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500":
              error,
          }
        )}
      />

      <div className="flex space-x-2 ">
        {!value ? (
          <Button
            variant={ButtonVariant.PrimaryBW}
            onClick={openFileDialog}
            disabled={processing}
          >
            {!processing
              ? `Upload ${notImage ? `File` : `Image`}`
              : "Uploading..."}
          </Button>
        ) : (
          <Button variant={ButtonVariant.PrimaryBW} onClick={clear}>
            Remove
          </Button>
        )}
      </div>
    </>
  );
};

const FileUploadInput = ({ name, label, control, errors, notImage }) => {
  const error = pathOr("", [name, "message"])(errors);

  return (
    <div>
      <p className="mb-1.5 block text-xs text-gray-400 transition-all">
        {label}
      </p>

      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input field={field} notImage={notImage} />}
      />

      <p className="mt-2 ml-1 block text-xs text-red-500">
        {capitalize(error)}
      </p>
    </div>
  );
};

export default FileUploadInput;

FileUploadInput.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.object.isRequired,
  notImage: PropTypes.bool,
};

FileUploadInput.defaultProps = {
  errors: {},
  label: "",
  notImage: false,
};
