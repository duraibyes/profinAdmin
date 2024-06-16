import React, { useCallback, useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import DangerButton from "@/Components/DangerButton";
import ConfirmDialog from "@/Components/ConfirmDialog";
import DataTable from "react-data-table-component";
import Pagination from "@/Components/Pagination";

export default function Index({
    auth,
    loan,
    filters = { query: "", size: 10 },
}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [isStatus, setIsStatus] = useState(false);
    const { delete: destroy, put } = useForm();
    const [searchQuery, setSearchQuery] = useState(filters.query || "");
    const [pageSize, setPageSize] = useState(filters.size || 10);
    console.log(" loan stared", loan);

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };
    const handleResetFilter = useCallback(() => {
        setSearchQuery("");
        Inertia.get(route("loans.index"));
    }, []);

    const handleFilter = () => {
        fetchData(1);
    };

    const handleStatusChange = (id) => {
        setIsStatus(true);
        setDeleteId(id);
        setOpenDialog(true);
    };

    const handleSubmit = () => {
        if (isStatus) {
            put(route("loans.update-status", deleteId), {
                preserveScroll: true,
                onSuccess: () => {
                    setOpenDialog(false);
                },
            });
        } else {
            destroy(route("loans.destroy", deleteId), {
                preserveScroll: true,
                onSuccess: () => {
                    setOpenDialog(false);
                },
            });
        }
    };

    const fetchData = (page) => {
        Inertia.get(route("loans.index"), {
            page,
            query: searchQuery,
            size: pageSize,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} className="p-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-1">
                    <div className="flex justify-between items-center py-1">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="border-gray-300 rounded-md px-4 py-2"
                        />
                        <button
                            onClick={handleFilter}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Search
                        </button>
                        <button
                            onClick={handleResetFilter}
                            className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-md"
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <div className="bg-slate-50 w-full p-5">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                >
                                    Created Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                >
                                    Mobile No
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                >
                                    Loan Amount
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                >
                                    Loan Category
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                >
                                    Status
                                </th>

                                <th
                                    scope="col"
                                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                            {loan.data.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                        {item.createdDate}
                                    </td>
                                    <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                        {item.contact_no}
                                    </td>
                                    <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                        {item.email_id}
                                    </td>
                                    <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                        {item.loan_amount}
                                    </td>
                                    <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                        {item.loan_amount}
                                    </td>
                                    <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                        <label className="inline-flex items-center me-5 cursor-pointer">
                                            <select
                                                className="form-select"
                                                value={item.status}
                                                onChange={handleStatusChange}
                                            >
                                                <option value="new">New</option>
                                                <option value="interested">
                                                    Interested
                                                </option>
                                                <option value="cancelled">
                                                    Cancelled
                                                </option>
                                                <option value="completed">
                                                    Completed
                                                </option>
                                            </select>
                                            
                                        </label>
                                    </td>

                                    <td className="px-6 py-1 whitespace-nowrap text-end text-sm font-medium">
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            type="button"
                                            className="ml-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end">
                        <Pagination links={loan.links} />
                    </div>
                </div>
            </div>
            <ConfirmDialog
                open={openDialog}
                handleDialogClose={handleDialogClose}
                handleSubmit={handleSubmit}
                title={`${isStatus ? "Change Status" : "Delete"}`}
            />
        </AuthenticatedLayout>
    );
}
