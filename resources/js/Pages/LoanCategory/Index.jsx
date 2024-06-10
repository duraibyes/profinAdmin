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
    category,
    filters = { query: "", size: 10 },
}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [isStatus, setIsStatus] = useState(false);
    const { delete: destroy, put } = useForm();
    const [searchQuery, setSearchQuery] = useState(filters.query || "");
    const [pageSize, setPageSize] = useState(filters.size || 10);
    console.log(" compoente stared", category);

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };
    const handleResetFilter = useCallback(() => {
        setSearchQuery("");
        Inertia.get(route("loan-category.index"));
    }, []);

    const handleFilter = () => {
        fetchData(1);
    };

    const updateStatus = (id) => {
        setIsStatus(true);
        setDeleteId(id);
        setOpenDialog(true);
    };
    const handleSubmit = () => {
        if (isStatus) {
            put(route("loan-category.update-status", deleteId), {
                preserveScroll: true,
                onSuccess: () => {
                    setOpenDialog(false);
                },
            });
        } else {
            destroy(route("loan-category.destroy", deleteId), {
                preserveScroll: true,
                onSuccess: () => {
                    setOpenDialog(false);
                },
            });
        }
    };

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Status",
            cell: (row) => (
                <label className="inline-flex items-center me-5 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={() => updateStatus(row.id)}
                        checked={row.status === "active"}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {row.status.toUpperCase()}
                    </span>
                </label>
            ),
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => <></>,
            ignoreRowClick: true,
        },
    ];

    const fetchData = (page) => {
        Inertia.get(
            route("loan-category.index"),
            { page, query: searchQuery, size: pageSize },
        );
    };

    return (
        <AuthenticatedLayout user={auth.user} className="p-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <h2 className="text-red-500 font-bold">Loan Category</h2>
                    <Link href={`loan-category/add`}>
                        <PrimaryButton>Add</PrimaryButton>
                    </Link>
                </div>
                <div className="flex justify-between items-center py-4">
                    <div className="flex justify-between items-center py-4">
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
                                    Name
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
                            {category.data.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                        <label className="inline-flex items-center me-5 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                onChange={() =>
                                                    updateStatus(item.id)
                                                }
                                                checked={
                                                    item.status === "active"
                                                }
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                {item.status.toUpperCase()}
                                            </span>
                                        </label>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                        <Link
                                            href={`loan-category/add/${item.id}`}
                                            className="ml-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"

                                        >
                                           Edit
                                        </Link>

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
                        <Pagination links={category.links} />
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
