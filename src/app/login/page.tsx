"use client";

import { login } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await fetch(`http://localhost:3001/users?email=${email}`);
            const users = await res.json();

            if (users.length === 0) {
                setError('User not found');
                return;
            }

            const user = users[0];

            if (!user.verified) {
                setError('User not verified');
                return;
            }

            dispatch(
                login({
                    id: String(user.id),
                    email: user.email,
                    role: user.role as "tenant" | "owner" | "admin",
                })
            );

            if (user.role === "tenant") router.push('/tenants');
            if (user.role === "owner") router.push('/owners');
            if (user.role === "admin") router.push('/admin/users');

        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred while logging in');
        }
    }
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded mr-2"
            />

            <button
                onClick={handleLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Login
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}

