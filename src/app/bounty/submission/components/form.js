import { XIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { array, object, string } from "yup";

import Api from "../../../../api/instances/core";
import Button, { ButtonVariant } from "../../../../components/button";
import Editor from "../../../../components/editor";
import Input from "../../../../components/input";
import Step from "../../../../components/step";

const schema = object({
  links: array().of(string()).required(),
  files: array().of(string()).required(),
  discord: string().required(),
  twitter: string().required(),
  telegram: string().required(),
  email: string().email().required(),
  description: string().required(),
});

const Form = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      links: ["https://"],
      files: ["https://"],
    },
  });

  const links = useFieldArray({
    control,
    name: "links",
  });

  const files = useFieldArray({
    control,
    name: "files",
  });

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (values) => {
        const submission = await Api.post("/bounty/submission", {
          bountyId: router.query.id,
          ...values,
        });

        if (submission) {
          await router.push(`/bounty/${router.query.id}`);
        }

        return Boolean(submission);
      }),
    [handleSubmit, router]
  );

  return (
    <form onSubmit={onSubmit} className="max-w-xl py-12">
      <Step title="Link to your submission">
        <p className="mb-1.5 block text-xs text-gray-400 transition-all empty:hidden">
          We prefer Medium, Substack, Notion, etc., link for written content;
          and Figma for design content.
        </p>
        <div className="mb-2">
          {links.fields.map((field, index) => (
            <div key={field.id} className="mb-2 flex w-full space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  name={`links.${index}`}
                  register={register}
                  errors={errors}
                />
              </div>
              <Button onClick={() => links.remove(index)} className="px-3">
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant={ButtonVariant.PrimaryBW}
          onClick={() => links.append(undefined)}
          className="text-sm"
        >
          + Add
        </Button>
      </Step>
      <Step title="UPLOAD FILE">
        <p className="mb-1.5 block text-xs text-gray-400 transition-all empty:hidden">
          We prefer .word, .pdf etc. or written content; and Figma for design
          content.
        </p>
        <div className="mb-2">
          {files.fields.map((field, index) => (
            <div key={field.id} className="mb-2 flex w-full space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  name={`files.${index}`}
                  register={register}
                  errors={errors}
                />
              </div>
              <Button onClick={() => files.remove(index)} className="px-3">
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant={ButtonVariant.PrimaryBW}
          onClick={() => files.append(undefined)}
          className="text-sm"
        >
          + Add
        </Button>
      </Step>
      <Step title="DISCORD HANDLE">
        <Input
          type="text"
          name="discord"
          register={register}
          errors={errors}
          label="We prefer .word, .pdf etc. or written content; and Figma for design content."
        />
      </Step>
      <Step title="Twitter handle">
        <Input
          type="text"
          name="twitter"
          register={register}
          errors={errors}
          label="We prefer .word, .pdf etc. or written content; and Figma for design content."
        />
      </Step>
      <Step title="Telegram handle">
        <Input
          type="text"
          name="telegram"
          register={register}
          errors={errors}
          label="We prefer .word, .pdf etc. or written content; and Figma for design content."
        />
      </Step>
      <Step title="email address">
        <Input
          type="text"
          name="email"
          register={register}
          errors={errors}
          label="We prefer .word, .pdf etc. or written content; and Figma for design content."
        />
      </Step>
      <Step title="Additional Description" hideLine>
        <Editor
          name="description"
          control={control}
          errors={errors}
          label="Description"
        />
      </Step>
      <Button
        variant={ButtonVariant.PrimaryBW}
        type="submit"
        disabled={isSubmitting}
        className="ml-12 mt-8 flex"
      >
        <div className="mr-2 rounded-sm bg-white text-black">
          <PlusIcon className="h-3 w-3" />
        </div>
        Submit
      </Button>
    </form>
  );
};

export default Form;
