import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import check from "../assets/checked.png";
import { OfferService } from "../services/OfferService";

const Reservation = () => {
    const [reservations, setReservations] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const response = await OfferService.getReservations();
            setReservations(response);
        };
        fetch();
    }, [refresh]);

    const refreshPage = () => {
        setRefresh(!refresh);
    };

    const handleConfirm = async (id) => {
        const response = await OfferService.confirmReservations(id);
        if (response.status === 200) {
            refreshPage();
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-10">
            <Navigation />
            <div className="pt-28 px-6 md:px-16">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">Reservation List</h1>
                <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-100 text-gray-700 text-sm font-bold">
                            <tr className="text-center">
                                <th className="py-3 px-4">Offer ID</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Surname</th>
                                <th className="py-3 px-4">Phone</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Payment</th>
                                <th className="py-3 px-4"># Travelers</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations &&
                                reservations.map((res, i) => (
                                    <tr
                                        key={i}
                                        className="text-center border-t hover:bg-gray-50"
                                    >
                                        <td className="py-2 px-4">{res.offer_id}</td>
                                        <td className="py-2 px-4">{res.traveler_name}</td>
                                        <td className="py-2 px-4">{res.traveler_surname}</td>
                                        <td className="py-2 px-4">{res.phone_number}</td>
                                        <td className="py-2 px-4">{res.email}</td>
                                        <td className="py-2 px-4">{res.payment}</td>
                                        <td className="py-2 px-4">{res.num_of_travelers}</td>
                                        <td className="py-2 px-4">
                                            {res.status === "1" ? (
                                                <span className="text-green-600 font-semibold">
                                                    Confirmed
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleConfirm(res.id)}
                                                    className="hover:scale-110 transition"
                                                >
                                                    <img
                                                        src={check}
                                                        alt="Confirm"
                                                        className="w-6 h-6 mx-auto"
                                                    />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reservation;

