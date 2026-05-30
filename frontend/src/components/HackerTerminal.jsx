import { useEffect, useState } from "react";

export default function HackerTerminal() {

    const [lines, setLines] = useState([]);

    useEffect(() => {

        const commands = [
            "Scanning suspicious IP...",
            "Decrypting payload...",
            "Monitoring network traffic...",
            "Threat intelligence synced...",
            "Analyzing malware signature...",
            "Firewall rule updated...",
            "Suspicious process isolated..."
        ];

        const interval = setInterval(() => {

            const random =
                commands[
                    Math.floor(Math.random() * commands.length)
                ];

            setLines((prev) => [
                ...prev.slice(-5),
                `> ${random}`
            ]);

        }, 2000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="bg-black border border-green-900 rounded-xl p-6 font-mono">

            <h2 className="text-green-400 text-2xl mb-4">
                AI Security Terminal
            </h2>

            <div className="space-y-2 text-green-500">

                {lines.map((line, index) => (

                    <div key={index}>
                        {line}
                    </div>
                ))}

            </div>

        </div>
    );
}