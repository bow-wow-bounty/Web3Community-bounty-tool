import { TrashIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { array, object, string } from "yup";

import Api from "../../../api/instances/core";
import Button, { ButtonVariant } from "../../../components/button";
import Input from "../../../components/input";

const schema = object({
  roles: array()
    .of(
      object({
        wallet: string().required(),
        roles: array().of(string()).required(),
      })
    )
    .required(),
});

const Roles = ({ roles: initialRoles, refresh }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      roles: initialRoles,
    },
  });

  const roles = useFieldArray({
    control,
    name: "roles",
  });

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (values) => {
        return Api.put("/admin/roles", { roles: values.roles }).then(() =>
          refresh()
        );
      }),
    [handleSubmit, refresh]
  );

  return (
    <div className="mx-auto max-w-lg">
      <p className="w-full text-center font-display text-2xl">
        Role Management
      </p>
      <p className="mb-8 w-full text-center text-xs text-gray-500">
        (Users need to re-login for role changes to take full effect)
      </p>
      <form onSubmit={onSubmit}>
        {roles.fields.map((field, index) => (
          <div
            key={field.id}
            className="my-4 mb-2 flex w-full items-start space-x-8 rounded-lg px-8 pt-4 pb-8 shadow-lg"
          >
            <div className="flex-1">
              <legend className="mt-4 mb-2">Wallet:</legend>
              <Input
                type="text"
                name={`roles.${index}.wallet`}
                register={register}
                errors={errors}
              />
              <Controller
                name={`roles.${index}.roles`}
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <div className="mt-4">
                      <fieldset>
                        <legend>Roles:</legend>
                        <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
                          {["SUPER_ADMIN", "ADMIN", "CREATOR"].map((role) => (
                            <div
                              key={role}
                              className="relative flex items-start py-4"
                            >
                              <div className="min-w-0 flex-1 text-sm">
                                <label
                                  htmlFor={`person-${role}`}
                                  className="select-none font-medium text-gray-700"
                                >
                                  {role.split("_").join(" ")}
                                </label>
                              </div>
                              <div className="ml-3 flex h-5 items-center">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  disabled={role === "SUPER_ADMIN"}
                                  checked={value.includes(role)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      onChange([...value, role]);
                                    } else {
                                      onChange(value.filter((x) => x !== role));
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  );
                }}
              />
            </div>
            <Button
              onClick={() => roles.remove(index)}
              className="mt-11 flex h-12 w-12 items-center justify-center px-3"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="mt-4 flex w-full justify-end">
          <Button
            variant={ButtonVariant.PrimaryBW}
            onClick={() => roles.append({ wallet: "", roles: [] })}
            className="text-sm"
          >
            + Add
          </Button>
        </div>
        <Button
          variant={ButtonVariant.PrimaryBW}
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full"
        >
          <p className="w-full text-center">Save</p>
        </Button>
      </form>
    </div>
  );
};

export default Roles;

Roles.propTypes = {
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      wallet: PropTypes.string.isRequired,
      roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  refresh: PropTypes.func.isRequired,
};
