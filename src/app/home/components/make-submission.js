import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

import Api from "../../../api/instances/core";
import Input from "../../../components/input";

const schema = object({
  bountyId: string().required(),
  link: string().required(),
  file: string().required(),
  discord: string().required(),
  twitter: string().required(),
  telegram: string().required(),
  email: string().email().required(),
  description: string().required(),
});

const MakeSubmission = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bountyId: "cl4nbz1qn0020tse555qk2t6x",
      link: "link",
      file: "file",
      discord: "discord",
      twitter: "twitter",
      telegram: "telegram",
      email: "email@test.com",
      description: "description",
    },
  });

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (values) => {
        // console.log({ values });
        return Api.post("/bounty/submission", values);
      }),
    [handleSubmit]
  );

  return (
    <div>
      <form onSubmit={onSubmit} className="mt-4 space-y-2 px-4">
        <p className="text-sm font-semibold">Make Submission</p>

        <Input
          type="text"
          name="bountyId"
          register={register}
          watch={watch}
          errors={errors}
          label="BountyId"
        />
        <Input
          type="text"
          name="link"
          register={register}
          watch={watch}
          errors={errors}
          label="Link"
        />
        <Input
          type="text"
          name="file"
          register={register}
          watch={watch}
          errors={errors}
          label="File"
        />
        <Input
          type="text"
          name="discord"
          register={register}
          watch={watch}
          errors={errors}
          label="Discord"
        />
        <Input
          type="text"
          name="twitter"
          register={register}
          watch={watch}
          errors={errors}
          label="Twitter"
        />
        <Input
          type="text"
          name="telegram"
          register={register}
          watch={watch}
          errors={errors}
          label="Telegram"
        />
        <Input
          type="text"
          name="email"
          register={register}
          watch={watch}
          errors={errors}
          label="Email"
        />
        <Input
          type="text"
          name="description"
          register={register}
          watch={watch}
          errors={errors}
          label="Description"
        />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default MakeSubmission;
