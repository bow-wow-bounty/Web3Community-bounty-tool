import { XIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { array, date, number, object, string } from "yup";

import Api from "../../../api/instances/core";
import Button, { ButtonVariant } from "../../../components/button";
import Editor from "../../../components/editor";
import FormStep from "../../../components/form-step";
import Input from "../../../components/input";
import Select from "../../../components/select";
import Header from "./components/header";

const schema = object({
  title: string().required(),
  image: string().required(),
  category: string().required(),
  type: string().required(),
  wallets: array().of(string()).required(),
  deadline: date("").required(),
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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "wallets",
  });

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (values) => {
        const bounty = await Api.post("/bounty", values);

        if (bounty) {
          await router.push(`/dashboard/bounty/${bounty.id}`);
        }

        return Boolean(bounty);
      }),
    [handleSubmit, router]
  );

  const type = watch("type");

  return (
    <div className="min-h-full-page container mx-auto py-8">
      <Header />
      <form onSubmit={onSubmit} className="max-w-xl py-12">
        <FormStep title="Upload Image">
          <Input
            type="text"
            name="image"
            register={register}
            errors={errors}
            label="Image"
          />
        </FormStep>
        <FormStep title="Title">
          <Input
            type="text"
            name="title"
            register={register}
            errors={errors}
            label="Add a title to your bounty"
          />
        </FormStep>
        <FormStep title="Category">
          <Select
            type="text"
            name="category"
            register={register}
            errors={errors}
            label="Choose between Design, Engineering and other categories"
            options={[
              { key: "design", value: "Design" },
              { key: "engineering", value: "Engineering" },
              { key: "other", value: "Other" },
            ]}
          />
        </FormStep>
        <FormStep title="Type">
          <Select
            type="text"
            name="type"
            register={register}
            errors={errors}
            label="Type"
            options={[
              { key: "open", value: "Open" },
              { key: "closed", value: "Closed" },
            ]}
          />
        </FormStep>
        {type === "Closed" && (
          <FormStep title="Wallets">
            <div className="mb-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex w-full space-x-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      name={`wallets.${index}`}
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <Button onClick={() => remove(index)} className="px-3">
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant={ButtonVariant.PrimaryBW}
              onClick={() => append(undefined)}
              className="text-sm"
            >
              + Add
            </Button>
          </FormStep>
        )}

        <FormStep title="Deadline">
          <Input
            type="datetime-local"
            name="deadline"
            register={register}
            errors={errors}
            label="Choose the date of expiry of the Bounty"
          />
        </FormStep>
        <FormStep title="Description">
          <Editor
            name="description"
            control={control}
            errors={errors}
            label="Description"
          />
        </FormStep>
        <FormStep title="Todo">
          <Editor name="todo" control={control} errors={errors} label="Todo" />
        </FormStep>
        <FormStep title="Rewards and distribution">
          <Editor
            name="distribution"
            control={control}
            errors={errors}
            label="Rewards and distribution"
          />
        </FormStep>
        <FormStep title="Number of winners">
          <Input
            type="number"
            name="winnerCount"
            register={register}
            errors={errors}
            label="Number of winners"
          />
        </FormStep>
        <FormStep title="Total Reward">
          <Input
            type="number"
            name="totalReward"
            register={register}
            errors={errors}
            label="Total Reward"
          />
        </FormStep>
        <FormStep title="Evaluation criteria">
          <Editor
            name="evaluation"
            control={control}
            errors={errors}
            label="Evaluation criteria"
          />
        </FormStep>
        <FormStep title="Resources">
          <Editor
            name="resources"
            control={control}
            errors={errors}
            label="Resources"
          />
        </FormStep>
        <FormStep title="Point of Contact" hideLine>
          <div className="space-y-4">
            <Input
              type="text"
              name="pocName"
              register={register}
              errors={errors}
              label="Name"
            />
            <Input
              type="text"
              name="pocTwitter"
              register={register}
              errors={errors}
              label="Twitter Handle"
            />
            <Input
              type="text"
              name="pocDiscord"
              register={register}
              errors={errors}
              label="Discord Handle"
            />
          </div>
        </FormStep>
        <Button
          variant={ButtonVariant.PrimaryBW}
          type="submit"
          disabled={isSubmitting}
        >
          Complete
        </Button>
      </form>
    </div>
  );
};

export default CreateBounty;
