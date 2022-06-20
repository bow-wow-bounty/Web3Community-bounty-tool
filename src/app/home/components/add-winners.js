import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { array, number, object, string } from "yup";

import Api from "../../../api/instances/core";
import Input from "../../../components/input";

const schema = object({
  bountyId: string().required(),
  winners: array()
    .of(
      object({
        wallet: string().required(),
        amount: number().required(),
      })
    )
    .min(1)
    .required(),
});

const AddWinners = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bountyId: "cl4nbz1qn0020tse555qk2t6x",
      winners: [
        { wallet: "wallet-1", amount: 150 },
        { wallet: "wallet-2", amount: 100 },
        { wallet: "wallet-3", amount: 50 },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "winners",
  });

  const onSubmit = useMemo(
    () =>
      handleSubmit(async ({ bountyId, winners }) =>
        Api.post("/bounty/close", {
          winners: winners.map((winner) => ({ ...winner, bountyId })),
        })
      ),
    [handleSubmit]
  );

  return (
    <div>
      <form onSubmit={onSubmit} className="mt-4 space-y-2 px-4">
        <p className="text-sm font-semibold">Add Winners</p>
        <Input
          type="text"
          name="bountyId"
          register={register}
          watch={watch}
          errors={errors}
          label="BountyId"
        />

        {fields.map((field, index) => (
          <div key={field.id}>
            <Input
              type="text"
              name={`winners.${index}.wallet`}
              register={register}
              watch={watch}
              errors={errors}
              label="Wallet"
            />
            <Input
              type="number"
              name={`winners.${index}.amount`}
              register={register}
              watch={watch}
              errors={errors}
              label="Amount"
            />
          </div>
        ))}

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddWinners;
