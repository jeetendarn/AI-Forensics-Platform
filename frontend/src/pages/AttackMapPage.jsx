import Sidebar from "../components/Sidebar";
// import ThreatMap from "../components/ThreatMap";
import LiveAttackFeed from "../components/LiveAttackFeed";
import AnimatedAttackMap from "../components/AnimatedAttackMap";
export default function AttackMapPage() {

    return (

        <div className="flex bg-black text-white min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-4xl font-bold text-green-400 mb-8">
                    Global Cyber Attack Map
                </h1>

                <AnimatedAttackMap />

                <div className="mt-8">

                    <LiveAttackFeed />

                </div>

            </div>

        </div>
    );
}