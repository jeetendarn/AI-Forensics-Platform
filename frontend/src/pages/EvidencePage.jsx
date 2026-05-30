import { useState } from "react";

import Sidebar from "../components/Sidebar";

import API from "../services/api";

export default function EvidenceUploadPage() {

    const [file, setFile] = useState(null);

    const [uploadResult, setUploadResult] =
        useState(null);

    const handleUpload = async () => {

        if (!file) {

            alert("Please select a file");

            return;
        }

        try {

            const formData = new FormData();

            formData.append(
                "file",
                file
            );

            formData.append(
                "uploaded_by",
                "jeet"
            );

            formData.append(
                "notes",
                "AI SOC Evidence"
            );

            const response = await API.post(

                "/upload-evidence",

                formData,

                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            setUploadResult(
                response.data
            );

        }

        catch (error) {

            console.error(error);

            alert("Upload Failed");
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
                    h-[400px]
                    flex flex-col
                    items-center
                    justify-center
                    bg-[#081120]
                ">

                    <div className="text-7xl mb-6">
                        📁
                    </div>

                    <h2 className="text-2xl font-bold">
                        Upload Evidence Files
                    </h2>

                    <p className="text-gray-400 mt-4">
                        Upload screenshots, logs,
                        malware samples, videos
                    </p>

                    <input
                        type="file"
                        onChange={(e) =>
                            setFile(
                                e.target.files[0]
                            )
                        }
                        className="mt-8"
                    />

                    <button
                        onClick={handleUpload}
                        className="
                            mt-6
                            bg-green-500
                            hover:bg-green-600
                            px-6 py-3
                            rounded-xl
                            font-bold
                        "
                    >
                        Upload Evidence
                    </button>

                </div>

                {/* RESULT */}

                {uploadResult && (

                    <div className="
                        mt-8
                        bg-[#081120]
                        p-6
                        rounded-2xl
                        border border-gray-800
                    ">

                        <h2 className="text-2xl text-green-400 mb-4">
                            Upload Successful
                        </h2>

                        <p>
                            <strong>File:</strong>
                            {" "}
                            {uploadResult.filename}
                        </p>

                        <p className="mt-2">
                            <strong>SHA256:</strong>
                        </p>

                        <p className="text-green-400 break-all mt-2">
                            {uploadResult.sha256}
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
}