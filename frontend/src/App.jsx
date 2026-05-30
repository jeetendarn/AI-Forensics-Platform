// import {
//     BrowserRouter,
//     Routes,
//     Route
// } from "react-router-dom";

// import DashboardPage from "./pages/DashboardPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import AttackMapPage from "./pages/AttackMapPage";
// import AIIncidentPage from "./pages/AIIncidentPage";
// import CCTVPage from "./pages/CCTVPage";
// import BlockchainPage from "./pages/BlockchainPage";
// import EvidenceUploadPage from "./pages/EvidenceUploadPage";
// // import SettingsPage from "./pages/SettingsPage";

// function App() {

//     return (

//         <BrowserRouter>

//             <Routes>

//                 <Route
//                     path="/"
//                     element={<DashboardPage />}
//                 />
//                      <Route
//                 path="/"
//                 element={<LoginPage />}
//             />

//             <Route
//                 path="/register"
//                 element={<RegisterPage />}
//             />

//                 <Route
//                     path="/attack-map"
//                     element={<AttackMapPage />}
//                 />

//                 <Route
//                     path="/ai-incidents"
//                     element={<AIIncidentPage />}
//                 />

//                 <Route
//                     path="/cctv"
//                     element={<CCTVPage />}
//                 />

//                 <Route
//                     path="/blockchain"
//                     element={<BlockchainPage />}
//                 /> 

//                 { <Route
//                     path="/evidence"
//                     element={<EvidenceUploadPage />}
//                 />

//                 /* {<Route
//                     path="/settings"
//                     element={<SettingsPage />}
//                 /> */}

//             </Routes>

//         </BrowserRouter>
//     );
// }

// export default App;
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";

import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";

import AttackMapPage from "./pages/AttackMapPage";

import AIIncidentPage from "./pages/AIIncidentPage";

import CCTVPage from "./pages/CCTVPage";

import BlockchainPage from "./pages/BlockchainPage";

import EvidenceUploadPage from "./pages/EvidenceUploadPage";

function ProtectedRoute({ children }) {

    const user =
        localStorage.getItem("user");

    return user
        ? children
        : <Navigate to="/" />;
}

export default function App() {

    return (

        <Routes>

            {/* LOGIN */}

            <Route
                path="/"
                element={<LoginPage />}
            />

            {/* REGISTER */}

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            {/* DASHBOARD */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            {/* ATTACK MAP */}

            <Route
                path="/attack-map"
                element={
                    <ProtectedRoute>
                        <AttackMapPage />
                    </ProtectedRoute>
                }
            />

            {/* AI INCIDENT */}

            <Route
                path="/ai-incidents"
                element={
                    <ProtectedRoute>
                        <AIIncidentPage />
                    </ProtectedRoute>
                }
            />

            {/* CCTV */}

            <Route
                path="/cctv"
                element={
                    <ProtectedRoute>
                        <CCTVPage />
                    </ProtectedRoute>
                }
            />

            {/* BLOCKCHAIN */}

            <Route
                path="/blockchain"
                element={
                    <ProtectedRoute>
                        <BlockchainPage />
                    </ProtectedRoute>
                }
            />

            {/* EVIDENCE */}

            <Route
                path="/upload"
                element={
                    <ProtectedRoute>
                        <EvidenceUploadPage />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}