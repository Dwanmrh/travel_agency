import { useState } from "react";
import arrow from "../assets/arrow.png";

function Pagination({
    currentPage,
    minPage,
    maxPage,
    totalPages,
    setCurrentPage,
    setMaxPage,
    setMinPage,
    showOffers,
    setShowOffers,
}) {
    const [perPage, setPerPage] = useState(showOffers);

    const incrementPage = () => {
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
        } else if (maxPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setMinPage(maxPage + 1);

            let count = 3;
            let countPage = maxPage;
            while (count > 0 && countPage < totalPages) {
                count -= 1;
                countPage += 1;
            }
            setMaxPage(countPage);
        } else {
            alert("You are on the last page!");
        }
    };

    const decrementPage = () => {
        if (currentPage > minPage) {
            setCurrentPage(currentPage - 1);
        } else if (minPage > 1) {
            setCurrentPage(currentPage - 1);
            setMinPage(minPage - 3);
            setMaxPage(minPage - 1);
        } else {
            alert("You are on the first page!");
        }
    };

    const setClickedPage = (page) => {
        setCurrentPage(page);
    };

    const handleChange = (e) => {
        setPerPage(parseInt(e.target.value));
    };

    const handleConfirm = () => {
        setShowOffers(perPage);
        setCurrentPage(1);
        setMinPage(1);
        setMaxPage(3);
    };

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const pageNumbers = pages.map((page) =>
        page >= minPage && page <= maxPage ? (
            <div
                key={page}
                className={`w-9 h-9 border border-gray-300 rounded flex items-center justify-center text-sm font-medium cursor-pointer ${
                    currentPage === page ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => setClickedPage(page)}
            >
                {page}
            </div>
        ) : null
    );

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-6 py-8 bg-white rounded-lg shadow-lg space-y-6">
            {/* Page navigation */}
            <div className="flex items-center flex-wrap gap-2 justify-center">
                <img
                    src={arrow}
                    alt="Previous"
                    className="rotate-180 w-5 h-5 cursor-pointer hover:opacity-70"
                    onClick={decrementPage}
                />
                {pageNumbers}
                <img
                    src={arrow}
                    alt="Next"
                    className="w-5 h-5 cursor-pointer hover:opacity-70"
                    onClick={incrementPage}
                />
            </div>

            {/* Offers per page selector */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <label htmlFor="offers" className="font-medium text-gray-700 text-sm">
                    Number of offers per page:
                </label>
                <select
                    id="offers"
                    name="offersnumber"
                    value={perPage}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-1 shadow-sm"
                >
                    {[6, 9, 12, 25, 50, 100].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleConfirm}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default Pagination;
