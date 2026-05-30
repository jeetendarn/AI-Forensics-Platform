import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThreatFeed() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {

        const threats = [
            "SQL Injection Attempt",
            "Ransomware Signature Detected",
            "Unauthorized Login Attempt",
            "DDoS Traffic Spike",
            "Phishing Domain Access",
            "Malware Payload Uploaded",
            "Suspicious PowerShell Activity",
            "Privilege Escalation Attempt"
        ];

        const interval = setInterval(() => {

            const randomThreat =
                threats[
                    Math.floor(Math.random() * threats.length)
                ];

            const newLog = {
                id: Date.now(),
                text: randomThreat,
                time: new Date().toLocaleTimeString()
            };

            setLogs((prev) => [newLog, ...prev.slice(0, 7)]);

        }, 3000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="bg-gray-900 p-6 rounded-xl border border-red-900">

            <h2 className="text-2xl text-red-400 font-bold mb-4">
                Live Threat Feed
            </h2>

            <div className="space-y-3">

                {logs.map((log) => (

                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-black p-3 rounded border border-gray-800"
                    >

                        <div className="flex justify-between">

                            <span className="text-red-300">
                                {log.text}
                            </span>

                            <span className="text-gray-500 text-sm">
                                {log.time}
                            </span>

                        </div>

                    </motion.div>
                ))}

            </div>

        </div>
    );
}