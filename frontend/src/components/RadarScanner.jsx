import { useEffect, useState } from "react";

export default function RadarScanner() {

    const [rotation, setRotation] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setRotation(prev => prev + 2);

        }, 30);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="bg-gray-900 rounded-xl p-6 border border-green-500 relative overflow-hidden h-[350px]">

            <h2 className="text-2xl font-bold text-green-400 mb-4">
                Threat Radar
            </h2>

            <div className="relative flex items-center justify-center h-full">

                {/* OUTER CIRCLE */}

                <div className="absolute w-72 h-72 rounded-full border border-green-700"></div>

                <div className="absolute w-56 h-56 rounded-full border border-green-800"></div>

                <div className="absolute w-40 h-40 rounded-full border border-green-900"></div>


                {/* SCAN LINE */}

                <div
                    className="absolute w-1 h-72 bg-green-400 origin-bottom"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        boxShadow: "0 0 20px #00ff88"
                    }}
                ></div>


                {/* CENTER DOT */}

                <div className="w-4 h-4 rounded-full bg-green-400 shadow-[0_0_20px_#00ff88]"></div>


                {/* PING DOTS */}

                <div className="absolute top-20 left-32 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>

                <div className="absolute bottom-24 right-28 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>

                <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>

            </div>

        </div>
    );
}