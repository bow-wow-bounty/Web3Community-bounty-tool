import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

import Button, { ButtonVariant } from "../../../../components/button";
import Select from "../../../../components/select";

const schema = object({
  category: string().required(),
  type: string().required(),
  timeline: string().required(),
});

const Header = ({ setQuery }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: "All",
      type: "All",
      timeline: "All",
    },
  });

  const onSubmit = useMemo(
    () =>
      handleSubmit(async ({ category, type, timeline }) => {
        const query = new URLSearchParams();

        if (category !== "All") {
          query.set("category", category);
        } else {
          query.delete("category");
        }
        if (type !== "All") {
          query.set("type", type);
        } else {
          query.delete("type");
        }
        if (timeline !== "All") {
          query.set("timeline", timeline);
        } else {
          query.delete("timeline");
        }

        setQuery(query.toString());
      }),
    [handleSubmit, setQuery]
  );

  return (
    <div className="rounded-lg bg-theme-orange p-8 shadow">
      <p className="font-display text-3xl">Hunt Bounties</p>
      <p className="mt-3 max-w-4xl text-sm font-light leading-tight">
        Get paid for being a Thug. Build a career in web3 and get rewarded
        in SOL & USDC. <br /> <br /> Exclusive to ThugBirdz holders. Bounties
        build the flock. CAW CAW <br /> <br /> The CawFathers of Thugistan used
        bounties for generations to build nests, harvest the canna crops and to
        keep the vibe alive. Hunt, Submit, Earn. No matter your feathers, this
        flock hunts bounties together. CAW
      </p>
      <form className="mt-6 flex items-center space-x-4" onSubmit={onSubmit}>
        <div className="w-48">
          <Select
            type="text"
            name="category"
            register={register}
            errors={errors}
            label="Category"
            className="rounded-sm border-none"
            labelClassName="text-black"
            options={[
              { key: "all", value: "All" },
              { key: "design", value: "Design" },
              { key: "engineering", value: "Engineering" },
              { key: "other", value: "Other" },
            ]}
          />
        </div>
        <div className="w-48">
          <Select
            type="text"
            name="type"
            register={register}
            errors={errors}
            label="Type"
            className="rounded-sm border-none"
            labelClassName="text-black"
            options={[
              { key: "all", value: "All" },
              { key: "open", value: "Open" },
              { key: "closed", value: "Closed" },
            ]}
          />
        </div>
        <div className="w-48">
          <Select
            type="text"
            name="timeline"
            register={register}
            errors={errors}
            label="Timeline"
            className="rounded-sm border-none"
            labelClassName="text-black"
            options={[
              { key: "all", value: "All" },
              { key: "active", value: "Active" },
              { key: "expired", value: "Ended" },
            ]}
          />
        </div>
        <Button
          type="submit"
          variant={ButtonVariant.PrimaryBW}
          disabled={isSubmitting}
          className="mt-5 rounded-sm py-1.5 text-sm text-theme-orange"
        >
          Apply Filters
        </Button>
      </form>
    </div>
  );
};

export default Header;

Header.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
