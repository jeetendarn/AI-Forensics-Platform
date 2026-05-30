import Sidebar from "../components/Sidebar";

export default function CCTVPage() {

    return (

        <div className="flex bg-black text-white min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-4xl font-bold text-green-400 mb-8">
                    Live CCTV Threat Detection
                </h1>

                <div className="bg-[#081120] border border-gray-800 rounded-2xl p-6">

                    <div className="bg-black h-[500px] rounded-xl flex items-center justify-center text-gray-500">

                        CCTV Stream Placeholder

                    </div>

                </div>

            </div>

        </div>
    );
}