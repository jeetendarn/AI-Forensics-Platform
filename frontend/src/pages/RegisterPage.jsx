import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleRegister = async () => {

        try {

            const response = await API.post(
                "/register",
                {
                    username,
                    email,
                    password
                }
            );

            alert(
                response.data.message
            );

            navigate("/");

        }

        catch (error) {

            console.error(error);

            alert("Registration Failed");
        }
    };

    return (

        <div className="min-h-screen bg-black flex items-center justify-center text-white">

            <div className="bg-[#081120] p-10 rounded-2xl w-[400px] border border-green-500">

                <h1 className="text-4xl font-bold text-green-400 mb-8 text-center">
                    Create Account
                </h1>

                <input
                    type="text"
                    placeholder="Username"

                    value={username}

                    onChange={(e) =>
                        setUsername(e.target.value)
                    }

                    className="w-full p-3 rounded-lg bg-gray-900 mb-4 border border-gray-700"
                />

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
                    onClick={handleRegister}

                    className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-xl font-bold"
                >
                    Create Account
                </button>

            </div>

        </div>
    );
}