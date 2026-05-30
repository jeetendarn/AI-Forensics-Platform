import { motion } from "framer-motion";

const attacks = [

    {
        id: 1,
        from: "Russia",
        to: "USA",
        top: "20%",
        left: "15%"
    },

    {
        id: 2,
        from: "China",
        to: "Germany",
        top: "25%",
        left: "75%"
    },

    {
        id: 3,
        from: "North Korea",
        to: "India",
        top: "40%",
        left: "80%"
    },

    {
        id: 4,
        from: "Iran",
        to: "UK",
        top: "30%",
        left: "66%"
    }
];

export default function AnimatedAttackMap() {

    return (

        <div className="relative h-[650px] bg-[#081120] border border-gray-800 rounded-2xl overflow-hidden">

            {/* WORLD MAP BACKGROUND */}

            <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
                alt="map"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />

            {/* ATTACK LINES */}

            {attacks.map((attack) => (

                <motion.div
                    key={attack.id}
                    initial={{
                        opacity: 0.2,
                        scale: 0.8
                    }}

                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.8, 1.2, 0.8]
                    }}

                    transition={{
                        duration: 2,
                        repeat: Infinity
                    }}

                    className="absolute"
                    style={{
                        top: attack.top,
                        left: attack.left
                    }}
                >

                    <div className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_red]" />

                    <div className="text-xs mt-2 text-red-300">
                        {attack.from} → {attack.to}
                    </div>

                </motion.div>

            ))}

            {/* TITLE */}

            <div className="absolute top-4 left-4">

                <h2 className="text-2xl font-bold text-green-400">
                    Live Global Attack Activity
                </h2>

            </div>

        </div>
    );
}