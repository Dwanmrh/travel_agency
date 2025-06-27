import React, { useEffect, useState } from "react";
import OfferCard from "../components/OfferElements/OfferCard";
import OfferDetails from "../components/OfferElements/OfferDetails";
import { OfferService } from "../services/OfferService";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Navigation from "../components/Navigation";
import homeBg from "../assets/homeBg.jpg";

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [modal, setModal] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [minPage, setMinPage] = useState(1);
    const [showOffers, setShowOffers] = useState(6);
    const [maxPage, setMaxPage] = useState(3);
    const [totalPages, setTotalPages] = useState(1);
    const [displayedOffers, setDisplayedOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        document.body.style.overflow = modal ? "hidden" : "auto";
    }, [modal]);

    useEffect(() => {
        const fetchOffers = async () => {
            setLoading(true);
            setError(false);
            try {
                const data = await OfferService.getAllOffers();
                if (Array.isArray(data)) {
                    setOffers(data);
                    setTotalPages(Math.ceil(data.length / showOffers));
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Error fetching offers:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    useEffect(() => {
        setTotalPages(Math.ceil(offers.length / showOffers));
    }, [offers, showOffers]);

    useEffect(() => {
        const start = (currentPage - 1) * showOffers;
        const end = currentPage * showOffers;
        setDisplayedOffers(offers.slice(start, end));
    }, [offers, currentPage, showOffers]);

    const offerCards = displayedOffers.map((data, i) => (
        <div
            onClick={() => setModal(data)}
            key={`${data.id}-${i}`}
            className="cursor-pointer transition-transform hover:scale-105"
        >
            <OfferCard data={data} />
        </div>
    ));

    return (
        <div
            className="min-h-screen w-full bg-gradient-to-b from-blue-100 via-blue-50 to-white bg-fixed"
            style={{ backgroundImage: `url(${homeBg})` }}
        >
            {/* Overlay semi-transparan */}
            <div className="absolute inset-0 bg-white/80 z-0" />

            {/* Navigation */}
            <div className="fixed w-full z-30">
                <Navigation />
            </div>

            {/* Main Content */}
            <div className="relative z-10 pt-[120px] pb-[80px] px-4 sm:px-8 max-w-[1440px] mx-auto">
                {/* Search */}
                <div className="mb-10 flex justify-center">
                    <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                        <Search
                            searchOffers={(data) => {
                                setOffers(Array.isArray(data) ? data : []);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>

                {/* Offers */}
                {loading ? (
                    <p className="text-blue-800 text-center text-lg col-span-full">Loading offers...</p>
                ) : error ? (
                    <p className="text-red-600 text-center text-lg col-span-full">Failed to load offers.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {offerCards.length > 0 ? (
                            offerCards
                        ) : (
                            <p className="text-blue-900 text-lg col-span-full text-center">
                                No offers found.
                            </p>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && (
                    <div className="mt-14 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            minPage={minPage}
                            maxPage={maxPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                            setMaxPage={setMaxPage}
                            setMinPage={setMinPage}
                            setShowOffers={setShowOffers}
                            showOffers={showOffers}
                        />
                    </div>
                )}
            </div>

            {/* Modal Offer Details */}
            {modal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md">
                    <div
                        className="absolute inset-0 bg-black/40 cursor-pointer"
                        onClick={() => setModal(null)}
                    />
                    <div className="z-10 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 shadow-lg">
                        <OfferDetails offer={modal} closeM={() => setModal(null)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Offers;
