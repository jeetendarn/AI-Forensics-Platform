import Sidebar from "../components/Sidebar";

export default function AIIncidentPage() {

    const incidents = [

        {
            id: 1,
            title: "Ransomware Detected",
            severity: "Critical",
            summary:
                "AI identified ransomware encryption patterns across endpoints."
        },

        {
            id: 2,
            title: "Credential Theft",
            severity: "High",
            summary:
                "Multiple login attempts detected from suspicious IP addresses."
        }

    ];

    return (

        <div className="flex bg-black text-white min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-4xl font-bold text-green-400 mb-8">
                    AI Incident Generator
                </h1>

                <div className="grid grid-cols-1 gap-6">

                    {incidents.map((incident) => (

                        <div
                            key={incident.id}
                            className="bg-[#081120] border border-gray-800 p-6 rounded-2xl"
                        >

                            <h2 className="text-2xl font-bold">
                                {incident.title}
                            </h2>

                            <p className="text-red-400 mt-2">
                                {incident.severity}
                            </p>

                            <p className="text-gray-300 mt-4">
                                {incident.summary}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}