import React, { useEffect, useState } from "react";
import logoDark from "../assets/logo-dark.png";
import Register from "./Register";
import LogIn from "./LogIn";
import userIcon from "../assets/user.png";
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
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm px-6 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="cursor-pointer" onClick={() => navigate("/")}>
                    <img src={logoDark} alt="Logo" className="w-[100px]" />
                </div>

                {/* Menu */}
                <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
                    {logged && (
                        <>
                            <button
                                onClick={() => navigate("/adminOffers")}
                                className={`hover:text-green-600 transition ${
                                    location.pathname === "/adminOffers"
                                        ? "text-green-600 border-b-2 border-green-600"
                                        : "text-gray-700"
                                }`}
                            >
                                Offers
                            </button>
                            <button
                                onClick={() => navigate("/reservations")}
                                className={`hover:text-green-600 transition ${
                                    location.pathname === "/reservations"
                                        ? "text-green-600 border-b-2 border-green-600"
                                        : "text-gray-700"
                                }`}
                            >
                                Reservations
                            </button>
                            {user?.role === "admin" && (
                                <button
                                    onClick={() => navigate("/users")}
                                    className={`hover:text-green-600 transition ${
                                        location.pathname === "/users"
                                            ? "text-green-600 border-b-2 border-green-600"
                                            : "text-gray-700"
                                    }`}
                                >
                                    Users
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-4">
                    {!logged ? (
                        <>
                            <button
                                onClick={() => setModal(true)}
                                className="px-4 py-1 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
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
                                className="px-4 py-1 border border-gray-400 text-gray-700 rounded hover:bg-gray-100 transition"
                            >
                                Guest
                            </button>
                        </>
                    ) : (
                        <>
                            <img
                                src={userIcon}
                                alt="user"
                                className="w-9 h-9 rounded-full cursor-pointer border border-gray-300 hover:ring-2 ring-green-400"
                                onClick={handleProfile}
                            />
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Modal Login */}
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
