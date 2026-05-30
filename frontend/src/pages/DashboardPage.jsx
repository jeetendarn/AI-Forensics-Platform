import { useEffect, useState } from "react";

import API from "../services/api";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import Sidebar from "../components/Sidebar";
import ThreatFeed from "../components/ThreatFeed";
// import HackerTerminal from "../components/HackerTerminal";
import ThreatCards from "../components/ThreatCards";
import ThreatMap from "../components/ThreatMap";
import RadarScanner from "../components/RadarScanner";
import LiveAttackFeed from "../components/LiveAttackFeed";
import AIMalwareScanner from "../components/AIMalwareScanner";

export default function DashboardPage() {

    const [dashboard, setDashboard] =
        useState(null);

    const [alerts, setAlerts] =
        useState([]);

    const [analytics, setAnalytics] =
        useState(null);


    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                // =========================
                // DASHBOARD API
                // =========================

                const dashboardResponse =
                    await API.get("/dashboard");

                setDashboard(
                    dashboardResponse.data
                );


                // =========================
                // ALERTS API
                // =========================

                const alertsResponse =
                    await API.get("/alerts");

                setAlerts(
                    alertsResponse.data
                );


                // =========================
                // ANALYTICS API
                // =========================

                const analyticsResponse =
                    await API.get("/analytics");

                setAnalytics(
                    analyticsResponse.data
                );

            }

            catch (error) {

                console.error(
                    "Dashboard Error:",
                    error
                );

                if (
                    error.response &&
                    error.response.status === 401
                ) {

                    alert(
                        "Session expired. Please login again."
                    );

                    localStorage.removeItem(
                        "token"
                    );

                    window.location.href = "/";
                }
            }
        };


        // INITIAL FETCH

        fetchDashboard();


        // AUTO REFRESH

        const interval = setInterval(() => {

            fetchDashboard();

        }, 5000);


        // CLEANUP

        return () => clearInterval(interval);

    }, []);


    if (!dashboard) {

        return (

            <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">

                Loading Dashboard...

            </div>
        );
    }


  return (

<div className="flex bg-black min-h-screen text-white">

    {/* SIDEBAR */}

    <Sidebar />

    {/* MAIN CONTENT */}

    <div className="flex-1 flex">

        {/* CENTER SECTION */}

        <div className="flex-1 p-6 overflow-y-auto">

            {/* HEADER */}

            <div className="
                flex
                justify-between
                items-center
                mb-8
            ">

                <div>

                    <h1 className="
                        text-4xl
                        font-bold
                        text-green-400
                    ">
                        SOC Dashboard
                    </h1>

                    <p className="text-gray-400">

                        AI-Powered Cyber Defense Platform

                    </p>

                </div>

                <button

                    onClick={() => {

                        localStorage.removeItem("user");

                        window.location.href = "/";
                    }}

                    className="
                        bg-red-500
                        hover:bg-red-600
                        px-5
                        py-2
                        rounded-lg
                        font-bold
                    "
                >

                    Logout

                </button>

            </div>

            {/* KPI */}

            <ThreatCards dashboard={dashboard} />

            {/* ALERT TABLE */}

            <div className="
                mt-8
                bg-[#081120]
                p-6
                rounded-xl
                border border-gray-800
            ">

                <h2 className="
                    text-2xl
                    font-bold
                    text-green-400
                    mb-4
                ">
                    Threat Alerts
                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b border-gray-700">

                            <th className="text-left p-3">
                                Title
                            </th>

                            <th className="text-left p-3">
                                Severity
                            </th>

                            <th className="text-left p-3">
                                Created At
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {alerts.map((alert) => (

                            <tr
                                key={alert.id}
                                className="border-b border-gray-800"
                            >

                                <td className="p-3">
                                    {alert.title}
                                </td>

                                <td className="p-3">
                                    {alert.severity}
                                </td>

                                <td className="p-3">
                                    {new Date(
                                        alert.created_at
                                    ).toLocaleString()}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* MAP + RADAR */}

            <div className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-6
                mt-8
            ">

                <ThreatMap />

                <RadarScanner />

            </div>

            {/* TERMINAL */}

            <div className="mt-8">

                <ThreatFeed />

            </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="
            w-[350px]
            border-l
            border-gray-800
            p-4
            space-y-6
            bg-[#040b16]
        ">

            <LiveAttackFeed />

            <AIMalwareScanner />

        </div>

    </div>

</div>

);
}