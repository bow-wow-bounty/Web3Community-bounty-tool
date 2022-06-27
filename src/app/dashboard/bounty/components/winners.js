import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { array, number, object, string } from "yup";

import Api from "../../../../api/instances/core";
import Button, { ButtonVariant } from "../../../../components/button";
import Input from "../../../../components/input";

const schema = object({
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

const Winners = ({ winners, refresh }) => {
  const router = useRouter();

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
      winners: winners?.length
        ? winners
        : [
            { wallet: "", amount: 0 },
            { wallet: "", amount: 0 },
            { wallet: "", amount: 0 },
          ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "winners",
  });

  const onSubmit = useMemo(
    () =>
      handleSubmit(async ({ winners }) =>
        Api.post("/bounty/close", {
          winners: winners.map((winner) => ({
            ...winner,
            bountyId: router.query.id,
          })),
        }).then(() => refresh())
      ),
    [handleSubmit, refresh, router.query.id]
  );

  return (
    <div className="w-[28em]">
      <p className="font-display text-3xl">Choose Winners</p>
      <form onSubmit={onSubmit} className="mt-4 space-y-4 px-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-4 rounded bg-white p-6 shadow-lg"
          >
            <div className="flex space-x-4">
              <p className="flex-1 whitespace-nowrap rounded bg-theme-orange py-1 px-3 text-center font-display text-2xl">
                Winner #{index + 1}
              </p>
              <div className="flex">
                <Input
                  type="number"
                  name={`winners.${index}.amount`}
                  register={register}
                  watch={watch}
                  errors={errors}
                  placeholder="Enter Amount"
                  className="max-w-[9em] rounded-r-none"
                />
                <p className="flex items-center justify-center rounded-r bg-black px-3 text-sm text-white">
                  SOL
                </p>
              </div>
            </div>
            <Input
              type="text"
              name={`winners.${index}.wallet`}
              register={register}
              watch={watch}
              errors={errors}
              placeholder="Enter Wallet Address"
            />
          </div>
        ))}
        {!winners.length && (
          <div className="flex justify-end">
            <Button
              variant={ButtonVariant.PrimaryBW}
              type="submit"
              disabled={isSubmitting}
            >
              Approve
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Winners;

Winners.propTypes = {
  winners: PropTypes.arrayOf(
    PropTypes.shape({
      wallet: PropTypes.string,
      amount: PropTypes.string,
    })
  ),
  refresh: PropTypes.func.isRequired,
};

Winners.defaultProps = {
  winners: [],
};
