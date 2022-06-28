import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { array, date, number, object, string } from "yup";

import Api from "../../../api/instances/core";
import Input from "../../../components/input";

const schema = object({
  title: string().required(),
  image: string().required(),
  category: string().required(),
  type: string().required(),
  wallets: array().of(string()).required(),
  deadline: date().required(),
  description: string().required(),
  todo: string().required(),
  distribution: string().required(),
  winnerCount: number().required(),
  evaluation: string().required(),
  resources: string().required(),
  totalReward: number().required(),
  pocName: string().required(),
  pocTwitter: string().required(),
  pocDiscord: string().required(),
});

const CreateBounty = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "title",
      image: "image",
      category: "category",
      type: "Closed",
      wallets: ["wallet1", "wallet2"],
      deadline: null,
      description: "description",
      todo: "todo",
      distribution: "distribution",
      winnerCount: 3,
      evaluation: "evaluation",
      resources: "resources",
      totalReward: 300,
      pocName: "pocName",
      pocTwitter: "pocTwitter",
      pocDiscord: "pocDiscord",
    },
  });

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (values) => {
        return Api.post("/bounty", values);
      }),
    [handleSubmit]
  );

  return (
    <div>
      <form onSubmit={onSubmit} className="mt-4 space-y-2 px-4">
        <p className="text-sm font-semibold">Create Bounty</p>
        <Input
          type="text"
          name="title"
          register={register}
          watch={watch}
          errors={errors}
          label="Title"
        />
        <Input
          type="text"
          name="image"
          register={register}
          watch={watch}
          errors={errors}
          label="Image"
        />
        <Input
          type="text"
          name="category"
          register={register}
          watch={watch}
          errors={errors}
          label="Category"
        />
        <Input
          type="text"
          name="type"
          register={register}
          watch={watch}
          errors={errors}
          label="Type"
        />
        <Input
          type="text"
          name="wallets"
          register={register}
          watch={watch}
          errors={errors}
          label="Wallets"
        />
        <Input
          type="datetime-local"
          name="deadline"
          register={register}
          watch={watch}
          errors={errors}
          label="Deadline"
        />
        <Input
          type="text"
          name="description"
          register={register}
          watch={watch}
          errors={errors}
          label="Description"
        />
        <Input
          type="text"
          name="todo"
          register={register}
          watch={watch}
          errors={errors}
          label="Todotle"
        />
        <Input
          type="text"
          name="distribution"
          register={register}
          watch={watch}
          errors={errors}
          label="Distribution"
        />
        <Input
          type="number"
          name="winnerCount"
          register={register}
          watch={watch}
          errors={errors}
          label="WinnerCount"
        />
        <Input
          type="text"
          name="evaluation"
          register={register}
          watch={watch}
          errors={errors}
          label="Evaluation"
        />
        <Input
          type="text"
          name="resources"
          register={register}
          watch={watch}
          errors={errors}
          label="Resources"
        />
        <Input
          type="number"
          name="totalReward"
          register={register}
          watch={watch}
          errors={errors}
          label="TotalReward"
        />
        <Input
          type="text"
          name="pocName"
          register={register}
          watch={watch}
          errors={errors}
          label="PocName"
        />
        <Input
          type="text"
          name="pocTwitter"
          register={register}
          watch={watch}
          errors={errors}
          label="PocTwitter"
        />
        <Input
          type="text"
          name="pocDiscord"
          register={register}
          watch={watch}
          errors={errors}
          label="PocDiscord"
        />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBounty;
