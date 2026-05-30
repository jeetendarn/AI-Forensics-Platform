import { useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

export default function EvidenceUploadPage() {

    const [file, setFile] = useState(null);

    const [notes, setNotes] = useState("");

    const [message, setMessage] = useState("");

    const handleUpload = async () => {

        if (!file) {

            setMessage("Please select a file");

            return;
        }

        try {

            const formData = new FormData();

            formData.append("file", file);

            formData.append(
                "uploaded_by",
                "admin"
            );

            formData.append(
                "notes",
                notes
            );

            const response = await axios.post(

                "http://127.0.0.1:8000/upload-evidence",

                formData,

                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            setMessage(response.data.message);

        } catch (error) {

            console.error(error);

            setMessage("Upload failed");
        }
    };

    return (

        <div className="flex bg-black text-white min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-4xl font-bold text-green-400 mb-8">
                    Evidence Upload Center
                </h1>

                <div className="
                    border-2 border-dashed border-green-500
                    rounded-2xl
                    p-10
                    bg-[#081120]
                    flex flex-col
                    items-center
                    justify-center
                ">

                    <div className="text-7xl mb-6">
                        📁
                    </div>

                    <h2 className="text-2xl font-bold">
                        Upload Evidence Files
                    </h2>

                    <p className="text-gray-400 mt-4 mb-6 text-center">
                        Upload screenshots, malware samples,
                        PDFs, videos, logs, images
                    </p>

                    {/* FILE INPUT */}

                    <input
                        type="file"
                        onChange={(e) =>
                            setFile(
                                e.target.files[0]
                            )
                        }
                        className="
                            bg-gray-900
                            p-3
                            rounded-lg
                            border border-green-500
                            cursor-pointer
                            w-full
                            max-w-md
                        "
                    />

                    {/* NOTES */}

                    <textarea

                        placeholder="Enter investigation notes..."

                        value={notes}

                        onChange={(e) =>
                            setNotes(e.target.value)
                        }

                        className="
                            mt-6
                            w-full
                            max-w-md
                            bg-gray-900
                            border border-green-500
                            rounded-xl
                            p-4
                            outline-none
                        "
                    />

                    {/* BUTTON */}

                    <button

                        onClick={handleUpload}

                        className="
                            mt-6
                            bg-green-500
                            hover:bg-green-600
                            px-8
                            py-3
                            rounded-xl
                            font-bold
                            transition
                        "
                    >
                        Upload Evidence
                    </button>

                    {/* MESSAGE */}

                    {message && (

                        <p className="mt-6 text-green-400">
                            {message}
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}