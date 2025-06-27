import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import bgImage from "../assets/homeBgDark.jpg"; // Travel-themed background

export const Home = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="relative w-full h-screen bg-gradient-to-b from-blue-600 via-blue-400 to-white overflow-hidden">
            <Navigation />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10 -mt-10">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl mb-4">
                Your Next Adventure Awaits!
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8">
                Explore dream spots at the best deals only with Tenta Tour.
                </p>
                <Link to="/offers">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-6 py-3 rounded-full shadow-lg transition duration-300">
                        Start Exploring Now
                    </button>
                </Link>
            </div>

            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 0,
                }}
            />
        </div>
    );
};