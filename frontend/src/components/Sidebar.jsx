import {
    Shield,
    Globe,
    Brain,
    Camera,
    Link2,
    Upload,
    Settings
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {

    return (

        <div className="w-72 bg-[#050816] border-r border-gray-800 min-h-screen p-6">

            <h1 className="text-3xl font-bold text-green-400 mb-10">
                AI-SOC
            </h1>

            <div className="space-y-4">

                <Link
                    to="/"
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#081120] hover:bg-[#0d1a2d] transition"
                >
                    <Shield />
                    Dashboard
                </Link>

                <Link
                    to="/attack-map"
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#081120] hover:bg-[#0d1a2d] transition"
                >
                    <Globe />
                    Cyber Attack Map
                </Link>

                <Link
                    to="/ai-incidents"
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#081120] hover:bg-[#0d1a2d] transition"
                >
                    <Brain />
                    AI Incident Center
                </Link>

                <Link
                    to="/cctv"
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#081120] hover:bg-[#0d1a2d] transition"
                >
                    <Camera />
                    CCTV Detection
                </Link>

                <Link
                    to="/blockchain"
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#081120] hover:bg-[#0d1a2d] transition"
                >
                    <Link2 />
                    Blockchain Verify
                </Link>

                <Link to="/upload"
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#081120] hover:bg-[#0d1a2d] transition"
                >
                    <Upload />
                    Evidence Upload
                </Link>

                <Link
                    to="/settings"
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#081120] hover:bg-[#0d1a2d] transition"
                >
                    <Settings />
                    Settings
                </Link>

            </div>

        </div>
    );
}