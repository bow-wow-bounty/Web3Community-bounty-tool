import "react-toastify/dist/ReactToastify.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { array, number, object, string } from "yup";

import Api from "../../../../api/instances/core";
import Button, { ButtonVariant } from "../../../../components/button";
import Input from "../../../../components/input";
// import createMultisigTransaction from "../../../../utils/create-multisig-transaction";
import createTransaction from "../../../../utils/create-transaction";

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

// eslint-disable-next-line react/prop-types
const Winners = ({ winners, winnerCount, rewardCurrency, refresh, status }) => {
  const router = useRouter();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

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
        : Array.from({ length: winnerCount }).map(() => ({
            wallet: "",
            amount: 0,
          })),
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
        })
          .then(() =>
            Api.post("/bounty/update", {
              id: router.query.id,
              status: "APPROVED",
            })
          )
          .then(() => refresh())
      ),
    [handleSubmit, refresh, router.query.id]
  );

  return (
    <div className="mt-8 w-full lg:mt-0 lg:w-[28em]">
      <ToastContainer />
      <p className="font-display text-3xl">Choose Winners</p>
      <form onSubmit={onSubmit} className="mt-4 space-y-4 lg:px-4">
        {fields.map((field, index) => {
          return (
            <div
              key={field.id}
              className="space-y-4 rounded bg-white py-2 shadow-lg lg:p-6"
            >
              <div className="flex space-x-4">
                <p className="flex-1 whitespace-nowrap rounded bg-theme-orange py-1 px-3 text-center font-display text-2xl">
                  Winner #{index + 1}
                </p>
                <div className="flex">
                  <Input
                    type="number"
                    name={`winners.${index}.amount`}
                    step="0.001"
                    presicion={2}
                    register={register}
                    watch={watch}
                    errors={errors}
                    placeholder="Enter Amount"
                    className="max-w-[9em] rounded-r-none"
                  />
                  <p className="flex items-center justify-center rounded-r bg-black px-3 text-sm text-white">
                    {rewardCurrency}
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
          );
        })}
        {Boolean(winners.length) && status !== "AWARDED" && (
          <Button
            variant={ButtonVariant.Primary}
            className="flex w-full justify-center"
            onClick={() =>
              createTransaction(publicKey, connection, sendTransaction, winners)
                ? Api.post("/bounty/update", {
                    id: router.query.id,
                    status: "AWARDED",
                  }).then(() => refresh())
                : console.log("Transaction Unsuccessful")
            }
          >
            Send Reward
          </Button>
        )}
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
      amount: PropTypes.number,
    })
  ),
  refresh: PropTypes.func.isRequired,
  rewardCurrency: PropTypes.string.isRequired,
  winnerCount: PropTypes.number.isRequired,
};

Winners.defaultProps = {
  winners: [],
};
