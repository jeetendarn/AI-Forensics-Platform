import { useEffect, useState } from "react";

const attackTemplates = [

    {
        country: "USA",
        attack: "Ransomware Injection",
        severity: "critical"
    },

    {
        country: "China",
        attack: "Port Scanning",
        severity: "high"
    },

    {
        country: "Germany",
        attack: "Malware Beacon",
        severity: "medium"
    },

    {
        country: "India",
        attack: "Brute Force Login",
        severity: "low"
    },

    {
        country: "Russia",
        attack: "Phishing Campaign",
        severity: "high"
    },

    {
        country: "North Korea",
        attack: "Zero-Day Exploit",
        severity: "critical"
    }
];

export default function LiveAttackFeed() {

    const [attacks, setAttacks] = useState([]);

    useEffect(() => {

        const interval = setInterval(() => {

            const randomAttack =
                attackTemplates[
                    Math.floor(
                        Math.random() *
                        attackTemplates.length
                    )
                ];

            const timestamp =
                new Date().toLocaleTimeString();

            const newAttack = {
                ...randomAttack,
                timestamp
            };

            setAttacks(prev => [

                newAttack,

                ...prev.slice(0, 7)

            ]);

        }, 2000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="bg-gray-900 border border-red-500 rounded-xl p-6 h-[400px] overflow-hidden">

            <h2 className="text-2xl font-bold text-red-400 mb-6">
                Live Attack Feed
            </h2>

            <div className="space-y-4">

                {attacks.map((attack, index) => (

                    <div
                        key={index}
                        className="bg-black border border-gray-800 p-4 rounded-lg animate-pulse"
                    >

                        <div className="flex justify-between">

                            <div>

                                <span className={`
                                    px-2 py-1 rounded text-sm mr-3

                                    ${
                                        attack.severity === "critical"
                                        ? "bg-red-600"

                                        : attack.severity === "high"
                                        ? "bg-yellow-500"

                                        : attack.severity === "medium"
                                        ? "bg-blue-500"

                                        : "bg-green-500"
                                    }
                                `}>

                                    {attack.severity.toUpperCase()}

                                </span>

                                <span className="text-white font-semibold">

                                    {attack.country}

                                </span>

                                <span className="text-gray-400 mx-2">
                                    →
                                </span>

                                <span className="text-green-400">

                                    {attack.attack}

                                </span>

                            </div>

                            <div className="text-gray-500 text-sm">

                                {attack.timestamp}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}