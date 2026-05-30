import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

export default function BlockchainPage() {

    const [evidence, setEvidence] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchEvidence();

    }, []);

    const fetchEvidence = async () => {

        try {

            const response = await axios.get(

                "http://127.0.0.1:8000/blockchain/evidence"
            );

            setEvidence(response.data);

        } catch (error) {

            console.error(
                "Evidence Fetch Error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="flex bg-black text-white min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="
                        text-4xl
                        font-bold
                        text-green-400
                    ">
                        🔗 Blockchain Evidence Verification
                    </h1>

                    <p className="text-gray-400 mt-3">
                        Digital Chain of Custody &
                        AI Forensic Validation
                    </p>

                </div>

                {/* LOADING */}

                {loading ? (

                    <div className="
                        text-green-400
                        text-xl
                    ">
                        Loading Evidence...
                    </div>

                ) : (

                    <div className="
                        bg-[#081120]
                        border border-green-500
                        rounded-2xl
                        overflow-hidden
                    ">

                        <table className="w-full">

                            <thead className="
                                bg-green-500
                                text-black
                            ">

                                <tr>

                                    <th className="p-4 text-left">
                                        File
                                    </th>

                                    <th className="p-4 text-left">
                                        SHA256 Hash
                                    </th>

                                    <th className="p-4 text-left">
                                        AI Verdict
                                    </th>

                                    <th className="p-4 text-left">
                                        Severity
                                    </th>

                                    <th className="p-4 text-left">
                                        Uploaded By
                                    </th>

                                    <th className="p-4 text-left">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {evidence.map((item) => (

                                    <tr
                                        key={item.id}

                                        className="
                                            border-b
                                            border-gray-800
                                            hover:bg-[#0f172a]
                                            transition
                                        "
                                    >

                                        {/* FILE */}

                                        <td className="p-4">

                                            {item.filename}

                                        </td>

                                        {/* HASH */}

                                        <td className="
                                            p-4
                                            text-xs
                                            text-green-400
                                            break-all
                                        ">

                                            {item.file_hash}

                                        </td>

                                        {/* AI VERDICT */}

                                        <td className="p-4">

                                            <span className={`
                                                px-3 py-1 rounded-full text-sm

                                                ${
                                                    item.ai_verdict === "Malicious"
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                                }
                                            `}>

                                                {item.ai_verdict}

                                            </span>

                                        </td>

                                        {/* SEVERITY */}

                                        <td className="p-4">

                                            <span className={`
                                                px-3 py-1 rounded-full text-sm

                                                ${
                                                    item.severity === "critical"
                                                    ? "bg-red-600"

                                                    : item.severity === "high"
                                                    ? "bg-orange-500"

                                                    : item.severity === "medium"
                                                    ? "bg-yellow-500"

                                                    : "bg-blue-500"
                                                }
                                            `}>

                                                {item.severity}

                                            </span>

                                        </td>

                                        {/* USER */}

                                        <td className="p-4">

                                            {item.uploaded_by}

                                        </td>

                                        {/* BLOCKCHAIN */}

                                        <td className="p-4">

                                            <span className="
                                                bg-green-500
                                                text-black
                                                px-3
                                                py-1
                                                rounded-full
                                                text-sm
                                                font-bold
                                            ">
                                                VERIFIED
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}