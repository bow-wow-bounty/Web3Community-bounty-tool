/* eslint-disable react/jsx-key */
import classNames from "classnames";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSortBy, useTable } from "react-table";

import Api from "../../../api/instances/core";
// import logo from "../../../assets/logo-small.svg";
import Loading from "../../../components/loading";
import fields from "../../../config/dashboard-bounty-table-fields";

const columns = fields.map((field) => ({
  Header: field.name,
  accessor: field.key,
}));

const Dashboard = () => {
  const router = useRouter();
  const [bounties, setBounties] = useState([]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: bounties,
      },
      useSortBy
    );

  useEffect(() => {
    Api.get("/bounty/owned").then((list) => {
      setBounties(
        list.map((item, index) => ({
          ...item,
          index,
          status_l:
            new Date(item.deadline).getTime() > Date.now()
              ? "Active"
              : "Expired",
        }))
      );
    });
  }, []);

  return !bounties ? (
    <div className="min-h-full-page w-full overflow-auto bg-theme-light-gray py-12">
      <Loading />
    </div>
  ) : (
    <div className="min-h-full-page w-full overflow-auto bg-theme-light-gray py-12">
      <div className="container relative mx-auto px-2">
        <div className="relative w-full overflow-auto">
          <div className="sticky left-0 top-0 flex w-full items-center justify-between rounded-t-md bg-theme-orange py-3 px-4">
            <p className="font-display text-2xl">Dashboard</p>
            <div className="h-full">
              {/* <div className="relative aspect-[5/3] w-12">
                <Image
                  src={logo}
                  layout="fill"
                  alt="Logo"
                  objectFit="contain"
                />
              </div> */}
            </div>
          </div>
          <table className="w-full border-hidden text-xs" {...getTableProps()}>
            <thead className="">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      className={classNames(
                        "whitespace-nowrap  bg-black py-3.5 px-3 text-center font-normal text-white",
                        {
                          "rounded-bl-md": !index,
                          "rounded-br-md": fields.length - 1 === index,
                        }
                      )}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.15))" }}
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(`/dashboard/bounty/${row.original.id}`)
                    }
                  >
                    {row.cells.map((cell, fieldIndex) => {
                      const bounty = cell.row.original;
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={classNames("py-1 px-0", {
                            "pt-4": !i,
                          })}
                        >
                          <div
                            className={classNames(
                              "flex h-full min-h-[40px] w-full items-center justify-center whitespace-nowrap bg-white px-3 text-center",
                              {
                                "rounded-tr rounded-br":
                                  fieldIndex === fields.length - 2,
                              }
                            )}
                          >
                            {fields[fieldIndex].value
                              ? fields[fieldIndex].value(bounty)
                              : cell.render("Cell")}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
