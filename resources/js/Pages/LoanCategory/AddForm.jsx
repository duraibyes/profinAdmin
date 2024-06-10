import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function AddForm({ auth, loanCategory }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: loanCategory ? loanCategory.name : "",
        description: loanCategory ? loanCategory.description : "",
        icon: null,
        icon_url: loanCategory ? loanCategory.icon_url : null,
    });
    const [fileError, setFileError] = useState("");
    console.log(' loanCategory ', loanCategory)
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith("image/")) {
            setFileError("The file must be an image.");
            setData("icon", null);
        } else {
            setFileError("");
            setData("icon", file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        if (data.icon) {
            formData.append("icon", data.icon);
        }

        post(route("loan-category.store", loanCategory ? loanCategory.id : ''), {
            data: formData,
            onSuccess: () => reset(),
            forceFormData: true,
        });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Loan Category" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="category_name"
                        >
                            Category Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Category Name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="icon"
                        >
                            Icon
                        </label>
                        {data.icon_url && (
                            <img src={data.icon_url} alt="Current Icon" className="mb-4 w-20 h-20 object-cover" />
                        )}
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="file"
                            onChange={handleFileChange}
                        />
                        {fileError && (
                            <InputError message={fileError} className="mt-2" />
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="category_name"
                        >
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            placeholder="What's on your mind?"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        ></textarea>
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    <div className="mb-4 text-end">
                        <Link href={route("loan-category.index")}>
                            <SecondaryButton className="mt-4  mr-3">
                                Cancel
                            </SecondaryButton>
                        </Link>
                        <PrimaryButton
                            className="mt-4"
                            disabled={processing || fileError}
                        >
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
