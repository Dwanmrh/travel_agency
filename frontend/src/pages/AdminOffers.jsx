import React, { useEffect, useState } from "react";
import OfferCard from "../components/OfferElements/OfferCard";
import AdminOfferDetails from "../components/AdminElements/AdminOfferDetails";
import { OfferService } from "../services/OfferService";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Navigation from "../components/Navigation";
import Button from "../components/FormElements/Button";
import AdminOfferAdd from "../components/AdminElements/AdminOfferAdd";
import { toast } from "react-toastify";

const AdminOffers = () => {
    const [offers, setOffers] = useState([]);
    const [modal, setModal] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [minPage, setMinPage] = useState(1);
    const [maxPage, setMaxPage] = useState(3);
    const [totalPages, setTotalPages] = useState(1);
    const [displayedOffers, setDisplayedOffers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [adding, setAdding] = useState(false);

    const showOffers = 50;

    useEffect(() => {
        document.body.style.overflow = modal || adding ? "hidden" : "auto";
    }, [modal, adding]);

    const searchOffers = (data) => {
        setOffers(data);
        setCurrentPage(1);
    };

    const closeModal = () => setModal(null);
    const abortAdding = () => setAdding(false);

    const fetchOffers = async () => {
        try {
            const data = await OfferService.getAllOffers();
            setOffers(data);
            setTotalPages(Math.ceil(data.length / showOffers));
        } catch (error) {
            toast.error("Failed to fetch offers");
        }
    };

    useEffect(() => {
        fetchOffers();
    }, [refresh]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * showOffers;
        const endIndex = startIndex + showOffers;
        setDisplayedOffers(offers.slice(startIndex, endIndex));
    }, [currentPage, offers]);

    const refreshPage = () => setRefresh((prev) => !prev);

    const handleAddOffer = async (data) => {
        const response = await OfferService.addOffer(data);
        if (response) {
            toast.success("Successfully added offer!", { position: toast.POSITION.TOP_RIGHT });
            refreshPage();
            setAdding(false);
        } else {
            toast.error("Error! Check your inputs.", { position: toast.POSITION.TOP_RIGHT });
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            <Navigation />

            <div className="pt-28 px-6 md:px-16">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <Search searchOffers={searchOffers} />
                    <div className="mt-4 md:mt-0">
                        <Button onClick={() => setAdding(true)}>Add Offer</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedOffers.map((offer, index) => (
                        <div onClick={() => setModal(offer)} key={`${offer.id}-${index}`}>
                            <OfferCard data={offer} />
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <Pagination
                        currentPage={currentPage}
                        minPage={minPage}
                        maxPage={maxPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        setMaxPage={setMaxPage}
                        setMinPage={setMinPage}
                    />
                </div>
            </div>

            {modal && (
                <div className="fixed z-50 w-full h-full flex justify-center items-center top-0 left-0 bg-black bg-opacity-40">
                    <AdminOfferDetails
                        offer={modal}
                        closeM={closeModal}
                        refreshPage={refreshPage}
                    />
                </div>
            )}

            {adding && (
                <div className="fixed z-50 w-full h-full flex justify-center items-center top-0 left-0 bg-black bg-opacity-40">
                    <AdminOfferAdd
                        toogle={abortAdding}
                        refreshPage={refreshPage}
                        add={handleAddOffer}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminOffers;
