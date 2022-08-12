import { XIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { array, date, number, object, string } from "yup";

import Api from "../../../api/instances/core";
import Button, { ButtonVariant } from "../../../components/button";
import Editor from "../../../components/editor";
import FileUploadInput from "../../../components/file-upload-input";
import Input from "../../../components/input";
import Select from "../../../components/select";
import Step from "../../../components/step";
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
    defaultValues: {
      wallets: [],
      rewardCurrency: "SOL",
    },
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
        <Step title="UPLOAD IMAGE">
          <FileUploadInput
            control={control}
            name="image"
            errors={errors}
            label="Add a cover image for your Bounty"
          />
        </Step>
        <Step title="TITLE">
          <Input
            type="text"
            name="title"
            register={register}
            errors={errors}
            label="Add a title to your bounty"
          />
        </Step>
        <Step title="CATEGORY">
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
        </Step>
        <Step title="TYPE">
          <Select
            type="text"
            name="type"
            register={register}
            errors={errors}
            label="Choose between open (anyone allowed to submit) and closed (specific wallets allowed to submit)"
            options={[
              { key: "open", value: "Open" },
              { key: "closed", value: "Closed" },
            ]}
          />
        </Step>
        {type === "Closed" && (
          <Step title="Wallets">
            <div className="mb-2">
              {fields.map((field, index) => (
                <div key={field.id} className="mb-2 flex w-full space-x-2">
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
          </Step>
        )}

        <Step title="DEADLINE">
          <Input
            type="datetime-local"
            name="deadline"
            register={register}
            errors={errors}
            label="Choose the date and time of expiry of the Bounty, Time will be set as per UTC 00:00 GMT"
          />
        </Step>
        <Step title="DESCRIPTION">
          <Editor
            name="description"
            control={control}
            errors={errors}
            label="Explain to your community what the bounty is about"
          />
        </Step>
        <Step title="TODO">
          <Editor
            name="todo"
            control={control}
            errors={errors}
            label="Tasks that need to be completed for a successful bounty submission"
          />
        </Step>
        <Step title="REWARDS AND DISTRIBUTION">
          <Editor
            name="distribution"
            control={control}
            errors={errors}
            label="How will rewards be distributed amongst winners (incase of multiple winners)"
          />
        </Step>
        <Step title="NUMBER OF WINNERS">
          <Input
            type="number"
            name="winnerCount"
            register={register}
            errors={errors}
            label="Number of wallets you are going to send rewards"
          />
        </Step>
        <Step title="TOTAL REWARD">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              name="totalReward"
              register={register}
              errors={errors}
              label="Sum of the total reward amount for all the winners"
            />
            <Select
              type="text"
              name="rewardCurrency"
              register={register}
              errors={errors}
              label="&nbsp;"
              options={[
                { key: "sol", value: "SOL" },
                { key: "wl", value: "WL" },
              ]}
            />
          </div>
        </Step>
        <Step title="EVALUATION CRITERIA">
          <Editor
            name="evaluation"
            control={control}
            errors={errors}
            label="Detailed explanation of criterias based on which winners will be judged"
          />
        </Step>
        <Step title="RESOURCES">
          <Editor
            name="resources"
            control={control}
            errors={errors}
            label="Additional links the users can refer to for more information"
          />
        </Step>
        <Step title="POINT OF CONTACT" hideLine>
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
        </Step>
        <Button
          variant={ButtonVariant.PrimaryBW}
          type="submit"
          disabled={isSubmitting}
          className="ml-12"
        >
          Complete
        </Button>
      </form>
    </div>
  );
};

export default CreateBounty;
