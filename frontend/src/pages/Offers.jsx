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
    const [showOffers, setShowOffers] = useState(6); // ganti ke 6 per page agar layout terlihat lebih rapi
    const [maxPage, setMaxPage] = useState(3);
    const [totalPages, setTotalPages] = useState(1);
    const [displayedOffers, setDisplayedOffers] = useState([]);

    useEffect(() => {
        document.body.style.overflow = modal ? "hidden" : "auto";
    }, [modal]);

    useEffect(() => {
        const fetchOffers = async () => {
            const data = await OfferService.getAllOffers();
            setOffers(data);
            setTotalPages(Math.ceil(data.length / showOffers));
        };
        fetchOffers();
    }, []);

    useEffect(() => {
        setTotalPages(Math.ceil(offers.length / showOffers));
    }, [showOffers, offers]);

    useEffect(() => {
        const start = (currentPage - 1) * showOffers;
        const end = currentPage * showOffers;
        setDisplayedOffers(offers.slice(start, end));
    }, [currentPage, showOffers, offers]);

    const offerCards = displayedOffers.map((data, i) => (
        <div onClick={() => setModal(data)} key={`${data.id}-${i}`}>
            <OfferCard data={data} />
        </div>
    ));

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${homeBg})`,
            }}
        >
            {/* Overlay gelap untuk keterbacaan */}
            <div className="absolute inset-0 bg-black opacity-50 z-0" />

            {/* Navigation tetap di atas */}
            <div className="fixed w-full z-20">
                <Navigation />
            </div>

            {/* Konten utama */}
            <div className="relative z-10 pt-[130px] pb-[100px] px-4 sm:px-8 max-w-[1440px] mx-auto">
                {/* Search */}
                <div className="mb-10">
                    <Search searchOffers={(data) => {
                        setOffers(data);
                        setCurrentPage(1);
                    }} />
                </div>

                {/* Offer Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offerCards.length > 0 ? (
                        offerCards
                    ) : (
                        <p className="text-white text-lg col-span-full text-center">
                            No offers found.
                        </p>
                    )}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
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
            </div>

            {/* Modal Offer Details */}
            {modal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-40 cursor-pointer"
                        onClick={() => setModal(null)}
                    />
                    <div className="z-10">
                        <OfferDetails offer={modal} closeM={() => setModal(null)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Offers;
