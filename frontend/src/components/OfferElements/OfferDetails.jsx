import React, { useState } from "react";
import OfferInformation from "./OfferInformation";
import OfferReservation from "./OfferReservation";
import close from "../../assets/close.png";
import Images from "../Images";

const OfferDetails = ({ offer, closeM }) => {
    const [reserving, setReserving] = useState(false);

    const handleToggle = () => {
        setReserving(!reserving);
    };

    return (
        <div className="w-[95%] h-[90%] bg-white rounded-2xl shadow-2xl overflow-hidden flex transition-all duration-300">
            {/* Left Side Image */}
            <div className="w-[60%] h-full flex justify-center items-center p-6 bg-gray-100">
                <Images offer={offer} />
            </div>

            {/* Right Side Detail / Reservation */}
            <div className="w-[40%] h-full p-6 relative flex flex-col">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center bg-gray-200 hover:bg-red-500 hover:text-white rounded-full transition"
                    onClick={closeM}
                >
                    <img src={close} alt="close" className="w-4 h-4" />
                </button>

                {/* Conditional Content */}
                <div className="mt-8 overflow-y-auto h-full">
                    {reserving ? (
                        <OfferReservation
                            toogle={handleToggle}
                            name={offer.city}
                            _id={offer.id}
                        />
                    ) : (
                        <OfferInformation toogle={handleToggle} offer={offer} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfferDetails;
