import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import logo from "../assets/logo.png";
import bgImage from "../assets/homeBgDark.jpg"; // penting: import gambar langsung

export const Home = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Navigation />

            {/* Gunakan inline style untuk background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50" />

                <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
                    <img
                        src={logo}
                        alt="Gringo Travel"
                        className="w-[300px] md:w-[400px] mb-10 drop-shadow-2xl"
                    />
                    <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
                        ANYTHING LIFE CAN OFFER
                    </h1>
                    <button
                        className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow-lg transition"
                        onClick={() => window.location.href = "/offers"}
                    >
                        Explore Now
                    </button>
                </div>
            </div>
        </div>
    );
};
