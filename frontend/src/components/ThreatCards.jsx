export default function ThreatCards() {

    const cards = [
        {
            title: "AI Detection Accuracy",
            value: "98.2%"
        },
        {
            title: "Threats Blocked",
            value: "1,284"
        },
        {
            title: "Active Incidents",
            value: "17"
        },
        {
            title: "System Health",
            value: "Secure"
        }
    ];

    return (

        <div className="grid grid-cols-4 gap-6 mb-8">

            {cards.map((card, index) => (

                <div
                    key={index}
                    className="bg-gray-900 p-6 rounded-xl border border-green-800 shadow-lg hover:scale-105 transition"
                >

                    <h3 className="text-gray-400">
                        {card.title}
                    </h3>

                    <p className="text-3xl font-bold text-green-400 mt-4">
                        {card.value}
                    </p>

                </div>
            ))}

        </div>
    );
}