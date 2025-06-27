import React, { useEffect, useState } from "react";
import logoDark from "../assets/logo-dark.png";
import Register from "./Register";
import LogIn from "./LogIn";
import { SessionService } from "../services/SessionService";
import { useLocation, useNavigate } from "react-router-dom";

function Navigation() {
    const [logged, setLogged] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalRegister, setModalRegister] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const closeModal = () => setModal(false);
    const closeRegisterModal = () => setModalRegister(false);
    const handleProfile = () => navigate("/profile");

    const handleLogout = () => {
        SessionService.clear();
        setLogged(false);
        setUser(null);
        navigate("/");
    };

    useEffect(() => {
        const session = SessionService.getSessionFromStorage();
        if (session) {
            setLogged(true);
            setUser(session[0]);
        }
    }, []);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-blue-500/90 backdrop-blur-md shadow-md px-6 py-3 flex justify-between items-center h-[64px]">
                {/* Logo and Brand */}
                <div
                    className="cursor-pointer flex items-center space-x-3"
                    onClick={() => navigate("/")}
                >
                    <img src={logoDark} alt="Logo" className="h-[52px]" />
                    <span className="text-white text-xl font-semibold tracking-wide">
                        Tenta Tour
                    </span>
                </div>

                {/* Navigation Menu */}
                <div className="hidden md:flex space-x-6 text-[15px] font-medium text-white">
                    {logged && (
                        <>
                            <button
                                onClick={() => navigate("/adminOffers")}
                                className={`transition hover:text-yellow-300 hover:underline underline-offset-4 ${
                                    location.pathname === "/adminOffers"
                                        ? "text-yellow-300 underline"
                                        : ""
                                }`}
                            >
                                Offers
                            </button>
                            <button
                                onClick={() => navigate("/reservations")}
                                className={`transition hover:text-yellow-300 hover:underline underline-offset-4 ${
                                    location.pathname === "/reservations"
                                        ? "text-yellow-300 underline"
                                        : ""
                                }`}
                            >
                                Reservations
                            </button>
                            {user?.role === "admin" && (
                                <button
                                    onClick={() => navigate("/users")}
                                    className={`transition hover:text-yellow-300 hover:underline underline-offset-4 ${
                                        location.pathname === "/users"
                                            ? "text-yellow-300 underline"
                                            : ""
                                    }`}
                                >
                                    Users
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-3">
                    {!logged ? (
                        <>
                            <button
                                onClick={() => setModal(true)}
                                className="px-4 py-1.5 text-sm font-medium text-white bg-blue-800 rounded-full hover:bg-blue-900 transition"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => setModalRegister(true)}
                                className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => navigate("/offers")}
                                className="px-4 py-1.5 text-sm font-medium text-white bg-blue-800 rounded-full hover:bg-blue-900 transition"
                            >
                                Guest
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleProfile}
                                className="px-4 py-1.5 text-sm font-medium text-white bg-blue-800 rounded-full hover:bg-blue-900 transition"
                            >
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-1.5 text-sm font-medium text-white bg-blue-800 rounded-full hover:bg-blue-900 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Login Modal */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        onClick={closeModal}
                        className="absolute inset-0 cursor-pointer"
                        style={{ zIndex: 10 }}
                    />
                    <div style={{ zIndex: 20, position: "relative" }}>
                        <LogIn closeM={closeModal} />
                    </div>
                </div>
            )}

            {/* Modal Register */}
            {modalRegister && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        onClick={closeRegisterModal}
                        className="absolute inset-0 cursor-pointer"
                        style={{ zIndex: 10 }}
                    />
                    <div style={{ zIndex: 20, position: "relative" }}>
                        <Register closeM={closeRegisterModal} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Navigation;

