import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

// Get all offers
const getAllOffers = async () => {
    try {
        const response = await axios.get(`${API_BASE}/home`);
        return response.data;
    } catch (error) {
        console.error("Error fetching offers:", error);
    }
};

// Reserve offer
const reserveOffer = async (data) => {
    try {
        const response = await axios.post(`${API_BASE}/reservation`, data);
        return response;
    } catch (error) {
        console.error("Error reserving offer:", error);
    }
};

// Search offers
const searchOffers = async (params) => {
    try {
        const response = await axios.post(`${API_BASE}/search`, params);
        return response.data;
    } catch (error) {
        console.error("Error searching offers:", error);
    }
};

// Delete offer
const deleteOffer = async (id) => {
    try {
        const response = await axios.get(`${API_BASE}/offer/delete/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting offer:", error);
    }
};

// Update offer
const updateOffer = async (id, data) => {
    try {
        const response = await axios.patch(`${API_BASE}/update/offer/${id}`, data);
        return response;
    } catch (error) {
        console.error("Error updating offer:", error.response?.data || error);
    }
};

// ✅ Add offer (with image upload)
const addOffer = async (data) => {
    try {
        const response = await axios.post(`${API_BASE}/offer`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        console.error("Error adding offer:", error.response?.data || error);
    }
};

// Get all reservations
const getReservations = async () => {
    try {
        const response = await axios.get(`${API_BASE}/reservations`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reservations:", error);
    }
};

// Confirm reservation
const confirmReservations = async (id) => {
    try {
        const response = await axios.post(`${API_BASE}/res/update/${id}`);
        return response;
    } catch (error) {
        console.error("Error confirming reservation:", error);
    }
};

// Export all service functions
export const OfferService = {
    getAllOffers,
    reserveOffer,
    searchOffers,
    deleteOffer,
    updateOffer,
    addOffer,
    getReservations,
    confirmReservations,
};
