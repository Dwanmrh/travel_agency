import React from "react";
import mapPin from "../../assets/mapPin.png";
import starIcon from "../../assets/star.png";
import available from "../../assets/available.png";
import expired from "../../assets/expired.png";

const OfferCard = ({ data }) => {
    const destination = data.offer_name.split(",");
    const rating = Array.from({ length: data.stars || 0 }).map((_, i) => (
        <img key={`${data.id}-${i}`} src={starIcon} alt="star" className="w-4 h-4" />
    ));
    const isAvailable = data.available === true || data.available === "1";

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative group">
            {/* Status Badge */}
            <div className="absolute top-3 right-3 z-10">
                <img
                    src={isAvailable ? available : expired}
                    alt="status"
                    className="w-8 h-8"
                />
            </div>

            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={`/cityImages/${data.destination_image}`}
                    alt={data.city}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <img src={mapPin} className="w-3 h-3" alt="location" />
                    <span className="uppercase">{data.country}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-800 truncate">
                    {destination[0]}
                </h2>
                <p className="text-sm text-gray-600 truncate">
                    {destination[1] || data.city}
                </p>
                <p className="text-sm text-gray-600">
                    {data.apartment ? "Apartment" : data.accomodation} • {data.num_of_days} days
                </p>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-blue-600 font-semibold">
                        Rp {Number(data.price).toLocaleString("id-ID")}
                    </p>
                    <div className="flex gap-1">{rating}</div>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
