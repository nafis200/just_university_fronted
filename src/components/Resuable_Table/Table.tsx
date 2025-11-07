/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Swal from "sweetalert2";

import { ColumnDef } from "@tanstack/react-table";
import { NMTable } from "./core/NMTable";
import TablePagination from "./core/NMTable/TablePagination";
import { showDeleteAlert } from "../resuble_toast/showDeleteAlert";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  name: string;
};

const Table = ({ payments }: { payments: Payment[] }) => {
  const handleDelete = async (payment: Payment) => {
    const confirmed = await showDeleteAlert(payment.name);
    console.log(confirmed)
    if (confirmed) {
      console.log("Deleting from database:", payment.id);
    }
  };
  const columns: ColumnDef<any>[] = [
    { accessorKey: "status", header: "Status" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "amount", header: "Amount" },
    {
      header: "Action",
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <button
            onClick={() => handleDelete(payment)}
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        );
      },
    },
  ];

  return (
    <div className="mt-5">
      <NMTable data={payments} columns={columns} />
      <TablePagination totalPage={2} />
    </div>
  );
};

export default Table;
