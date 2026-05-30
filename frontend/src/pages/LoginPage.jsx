import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await API.post(
                "/login",
                {
                    email,
                    password
                }
            );

            if (
                response.data.message ===
                "Login successful"
            ) {

                // SAVE SESSION

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data)
                );

                alert("Login Success");

                navigate("/dashboard");
            }

            else {

                alert(
                    response.data.message
                );
            }

        }

        catch (error) {

            console.error(error);

            alert("Login Failed");
        }
    };

    return (

        <div className="min-h-screen bg-black flex items-center justify-center text-white">

            <div className="bg-[#081120] p-10 rounded-2xl w-[400px] border border-green-500">

                <h1 className="text-4xl font-bold text-green-400 mb-8 text-center">
                    AI-SOC Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"

                    value={email}

                    onChange={(e) =>
                        setEmail(e.target.value)
                    }

                    className="w-full p-3 rounded-lg bg-gray-900 mb-4 border border-gray-700"
                />

                <input
                    type="password"
                    placeholder="Password"

                    value={password}

                    onChange={(e) =>
                        setPassword(e.target.value)
                    }

                    className="w-full p-3 rounded-lg bg-gray-900 mb-6 border border-gray-700"
                />

                <button
                    onClick={handleLogin}

                    className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-xl font-bold"
                >
                    Login
                </button>

                <p className="mt-6 text-center text-gray-400">

                    Don't have account?

                    <span
                        onClick={() =>
                            navigate("/register")
                        }

                        className="text-green-400 cursor-pointer ml-2"
                    >
                        Register
                    </span>

                </p>

            </div>

        </div>
    );
}